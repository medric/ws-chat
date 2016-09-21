import { chatHandler, getChannels } from './chatHandler';
import App from '../app/partials/App';
import { session, redisClient, RedisStore, sessionStore, parseCookie } from './bootstrap';
import { config } from '../common/config';

// SSR
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../common/routes';

const React = require('react');
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
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}));

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

  chatHandler.initSocket(wss);
});

// SSR
app.get('*', (req, res, next) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const component = renderToString(
        <RouterContext {...renderProps} />
      );

      fetchData();
      
      // Waiting for data to be fetched before rendering
      async function fetchData() {
        console.log('ff');
        let channels = await getChannels();
        console.log(channels);
        const data = {
          title: 'ChatX',
          content: component,
          state: {
            rooms: channels, // preload existing rooms
            messages: [],
            signedIn: req.session.user ? true : false
          }
        };

        res.status(200);
        res.render('index', data);
      }
    } else {
      res.status(404).send('Not found')
    }
  });
});

app.post('/signin', signin);
