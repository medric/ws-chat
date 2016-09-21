import { redisClient, sessionStore, parseCookie } from './bootstrap';
import {
  ADD_ROOM,
  LOAD_ROOM,
  FETCH_ROOMS,
  SEND_MESSAGE,
  SIGN_IN,
  LOAD_MESSAGE
} from '../common/utils';

import Promise from 'bluebird';

const shortid = require('shortid');
const express = require('express');
const redis = require('redis');

export const chatHandler = {
  clients: {},
  initSocket: function(wss) {
    if(!wss) {
      throw new Error('WebSocketServer is not defined');
    }

    this.wss = wss;

    this.wss.on('connection', ws => {
      console.log('new connection');
      parseCookie(ws.upgradeReq, null, (error) => {
        const sessionId = ws.upgradeReq.signedCookies['connect.sid'];
        sessionStore.get(sessionId, (error, session) => {
          if(session) {
            // add new user
            let user = session.user;

            if(session.user) {
              this.clients[user.id] = Object.assign({}, {ws: ws, roomId: null});
              listen(user);
            } else {
              // throw error
            }
          }
        });
      });
    });

    const listen = user => {
      this.clients[user.id].ws.on('message', (msg) => {
        try {
          let data = JSON.parse(msg);
          this.handleData(user, data);
        } catch (e) {
        }
      });
    }
  },
  join: function(userId, roomId) {
    // User weakmap instead ?
    this.clients[userId].roomId = roomId;
  },
  broadcast: function(data) {
    for (let k in this.clients) {
      this.clients[k].ws.send(JSON.stringify(data));
    }
  },
  broadcastToRoom: function(data) {
    for (let k in this.clients) {
      if(this.clients[k].roomId === data.roomId) {
        this.clients[k].ws.send(JSON.stringify(data));
      }
    }
  },
  handleData: function(user, data) {
    // Todo: data validation
    if(data.hasOwnProperty('type')) {
      switch (data.type) {
        case 'JOIN':
          this.join(user.id, data.roomId);
          break;
        case 'ADD_ROOM':
          // Save to redis
          const key = `rooms:${data.name}`;
          const roomsIndexKey = 'rooms';

          redisClient.multi()
            .hmset(key, 'name', data.name)
            .sadd(roomsIndexKey, key)
            .exec((err, replies) => {
              const res = Object.assign({}, data);
              this.join(user.id, data.name);
              this.broadcast(res);
            });
          break;
        case 'SEND_MESSAGE':
          const id = shortid.generate();
          const messagesIndexKey = `messages:${data.roomId}`;

          // atomic operation
          redisClient.multi()
          .incr('message:count')
          .exec((err, replies) => {
            var key = `message:${replies[0]}`;
            redisClient.multi()
            .hmset(key, 'id', id, 'roomId', data.roomId, 'author', data.roomId,
            'text', data.text, 'date', data.date)
            .sadd(messagesIndexKey, id)
            .exec((err, replies) => {
              if(err) {

              } else {
                let res = Object.assign({id: id}, data);
                // broadcast new message to room
                this.broadcastToRoom(res);
              }
            });
          });
          break;
        default:
          break;
      }
    }
  }
}

export function getChannels() {
  const indexKey = 'rooms';
  const multi = redisClient.multi();

  return new Promise((resolve, reject) => {
    multi.smembers(indexKey, '0', 'match', 'rooms:*', (err, replies) => {
      replies.forEach();
    });
  });
}
