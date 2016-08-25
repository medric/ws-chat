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
      var newClient = {};

      this._clients.push(newClient);

      ws.on('message', (message) => {
        try {
          var data = JSON.parse(message);

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
        case 'addRoom':
          var id = guid();
          var room = {
            id: id,
            name: data.name
          };

          // save to redis
          redisClient.lpush('rooms', JSON.stringify(room), (err, reply) => {
            // broadcast new room
            if(!err) {
              var res = Object.assign({}, room, {type: data.type});
              this._wss.broadcast(JSON.stringify(data));
            }
          });
          break;
        default:

      }
    }
  }
}
