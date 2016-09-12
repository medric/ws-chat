import { redisClient, sessionStore, parseCookie } from './bootstrap';

const express = require('express');
const redis = require('redis');
const actions = require('../common/config');
const guid = require('../common/utils').guid;

export const chat = {
  clients: {},
  initSocket: function(wss) {
    if(!wss) {
      throw new Error('WebSocketServer is not defined');
    }

    this._wss = wss;

    this._wss.on('connection', ws => {
      console.log('new connection');
      parseCookie(ws.upgradeReq, null, (error) => {
        var sessionId = ws.upgradeReq.signedCookies['connect.sid'];
        sessionStore.get(sessionId, (error, session) => {
          if(session) {
            // add new user
            var user = session.user;
            this.clients[user.id] = Object.assign({}, {ws: ws, roomId: null});
            listen(user);
          }
        });
      });
    });

    const listen = user => {
      this.clients[user.id].ws.on('message', (msg) => {
        try {
          var data = JSON.parse(msg);
          this._handleData(user, data);
        } catch (e) {
        }
      });
    }
  },
  _join: function(userId, roomId) {
    // user weakmap instead ?
    this.clients[userId].roomId = roomId;
  },
  _broadcast: function(data) {
    for (var k in this.clients) {
      this.clients[k].ws.send(data);
    }
  },
  _broadcastToRoom: function(message) {
    for (var k in this.clients) {
      if(this.clients[k].roomId === message.roomId) {
        this.clients[k].ws.send(message);
      }
    }
  },
  _handleData: function(user, data) {
    // todo: data validation
    if(data.hasOwnProperty('type')) {
      switch (data.type) {
        case 'JOIN':
          this._join(user.id, data.roomId);
          break;
        case 'FETCH_ROOMS':
          var key = `rooms:${data.name}`;
          redisClient.hmgetall(key, (error, reply) => {
            var res = Object.assign({}, data, {id: id});
            this._wss.broadcast(JSON.stringify(res));
          });
          break;
        case 'ADD_ROOM':
          // save to redis
          var key = `rooms:${data.name}`;
          redisClient.hmset(key, 'name', data.name, (error, reply) => {
            var res = Object.assign({}, data);
            this._join(user.id, data.name);
            this._broadcast(JSON.stringify(res));
          });
          break;
        case 'NEW_MESSAGE':
          var id = guid();

          const indexKey = `messages:${data.roomId}`;
          // atomic operation
          redisClient.multi()
          .incr('message:count')
          .exec((err, replies) => {
            var key = `message:${replies[0]}`;
            redisClient.multi()
            .hmset(key, 'roomId', data.roomId, 'author', data.roomId,
            'text', data.text, 'date', data.date)
            .sadd(indexKey, id)
            .exec((err, replies) => {
              this._broadcastToRoom(JSON.stringify(data));
            });
          });
          break;
        default:
      }
    }
  }
}
