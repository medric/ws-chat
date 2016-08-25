import { chat } from './chat';
import App from '../app/partials/app';

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('../webpack/webpack.config');
const fs = require('fs');
const url = require('url');
const path = require('path');
const _ = require('lodash');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');

const WebSocketServer = require('ws').Server;
const app = express();
const port = 3000;
const compiler = webpack(webpackConfig);

app.set('view engine', 'jade');

// use in dev only
app.use(webpackDevMiddleware(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

// Serve static files
app.use(express.static(path.join(__dirname, '../dist')));

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
    content: ReactDOMServer.renderToString(AppFactory())
  });
});
