const actions = {
  fecthRoom: {
  },
  addRoom: {
    parameters: ['name']
  },
  login: {
    parameters: ['name']
  }
};

const config = {};

config.twitter = {};
config.redis = {};
config.web = {};
config.secret = 'chatx';

config.redis.host = '127.0.0.1';
config.redis.port = 6379;

export {actions, config};
