// Bootstrap services
import { config } from '../common/config';
const cookieParser = require('cookie-parser');
const session = require('express-session');
const redis = require('redis');
const redisClient = redis.createClient(config.redis.port, config.redis.host);

const RedisStore = require('connect-redis')(session);
const sessionStore = new RedisStore({
  client: redisClient
});

const parseCookie = cookieParser(config.secret);

export {
  session,
  redisClient,
  RedisStore,
  sessionStore,
  parseCookie
};
