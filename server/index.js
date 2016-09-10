import { chat } from './chat';
import App from '../app/partials/app';
import { session, redisClient, RedisStore, sessionStore, parseCookie } from './bootstrap';
import { config } from '../common/config';

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('../webpack/webpack.config');
const fs = require('fs');
const url = require('url');
const path = require('path');
const _ = require('lodash');
const bodyParser = require('body-parser');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');

const WebSocketServer = require('ws').Server;
const app = express();
const port = 3000;
const compiler = webpack(webpackConfig);

const signin = require('./signinHandler');

app.use(bodyParser.json());      // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({  // to support URL-encoded bodies
  extended: true
}));

// Use the session middleware
app.use(parseCookie);
app.use(session({
  store: sessionStore,
  secret: config.secret
}));

app.set('view engine', 'jade');

// use in dev only
app.use(webpackDevMiddleware(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

// Serve static files
app.use(express.static(path.join(__dirname, '../dist')));

//http://stackoverflow.com/questions/28553904/client-routing-using-react-router-and-server-side-routing
// app.use(function(req, res, next) {
//   var router = Router.create({location: req.url, routes: routes})
//   router.run(function(Handler, state) {
//     var html = React.renderToString(<Handler/>)
//     return res.render('react_page', {html: html})
//   })
// });

const server = app.listen(port, () => {
  let port = server.address().port;

  console.log(`Server listening on ${port}`);

  const wss = new WebSocketServer(
    {
      server: server,
      path: '/ws'
    }
  );

  chat.initSocket(wss);
});

// SSR
var AppFactory = React.createFactory(App);
app.get('/', function(req, res, next) {
  res.render('index', {
    title: 'ChatX',
    content: ReactDOMServer.renderToString(AppFactory()),
    state: {
      rooms: [],
      messages: [],
      signedIn: false
    }
  });
});

app.post('/signin', signin);
