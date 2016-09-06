const redis = require('redis');
const redisClient = redis.createClient();
const actions = require('../common/config');
const guid = require('../common/utils').guid;

export const chat = {
  _clients: [],
  _rooms: [],
  _wss: null,
  initSocket: function(wss) {
    if(!wss) {
      throw new Error('WebSocketServer is not defined');
    }

    this._wss = wss;
    wss.on('connection', ws => {
      //var location = url.parse(ws.upgradeReq.url, true);
      // you might use location.query.access_token to authenticate or share sessions
      // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
      //var newClient = {};
      ws.on('message', (msg) => {
        try {
          var data = JSON.parse(msg);
          this._handleData(data);
        } catch (e) {
        }
      });

      ws.send('something');
    });

    this._wss.broadcast = function (data) {
      wss.clients.forEach(function each(client) {
        client.send(data);
      });
    };

  },
  _handleData: function(data) {
    // todo: data validation
    if(data.hasOwnProperty('type')) {
      switch (data.type) {
        case 'SIGN_IN':

        case 'FETCH_ROOMS':
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
            this._wss.broadcast(JSON.stringify(res));
          });

          break;
        case 'NEW_MESSAGE':
          var id = guid();

          const indexKey = `messages:${data.roomId}`;

          // atomic operation
          redisClient.multi()
          .incr('message:count')
          .exec(function (err, replies) {
            var key = `message:${replies[0]}`;
            redisClient.multi()
            .hmset(key, 'roomId', data.roomId, 'roomId', data.roomId,
            'text', data.text, 'data', data.date)
            .sadd(indexKey, id)
            .exec(function (err, replies) {

            });
          });

          break;
        default:
      }
    }
  }
}
