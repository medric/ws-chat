import { redisClient, sessionStore, parseCookie } from './bootstrap';
import {
  ADD_ROOM,
  LOAD_ROOM,
  FETCH_ROOMS,
  SEND_MESSAGE,
  SIGN_IN,
  LOAD_MESSAGE
} from '../common/utils';

const shortid = require('shortid');
const express = require('express');
const redis = require('redis');

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
      this.clients[k].ws.send(JSON.stringify(data));
    }
  },
  _broadcastToRoom: function(data) {
    for (var k in this.clients) {
      if(this.clients[k].roomId === data.roomId) {
        this.clients[k].ws.send(JSON.stringify(data));
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
            this._wss.broadcast(res);
          });
          break;
        case 'ADD_ROOM':
          // save to redis
          var key = `rooms:${data.name}`;
          redisClient.hmset(key, 'name', data.name, (error, reply) => {
            var res = Object.assign({}, data);
            this._join(user.id, data.name);
            this._broadcast(res);
          });
          break;
        case 'SEND_MESSAGE':
          var id = shortid.generate();

          const indexKey = `messages:${data.roomId}`;
          // atomic operation
          redisClient.multi()
          .incr('message:count')
          .exec((err, replies) => {
            var key = `message:${replies[0]}`;
            redisClient.multi()
            .hmset(key, 'id', id, 'roomId', data.roomId, 'author', data.roomId,
            'text', data.text, 'date', data.date)
            .sadd(indexKey, id)
            .exec((err, replies) => {
              var res = Object.assign({id: id}, data);
              // broadcast new message to room
              this._broadcastToRoom(res);
            });
          });
          break;
        default:
      }
    }
  }
}
