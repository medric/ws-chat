import express from 'express';
import graphqlHTTP from 'express-graphql';
import React from 'react';

import { chatHandler, getChannels } from './chatHandler';
import { session, redisClient, RedisStore, sessionStore, parseCookie } from './bootstrap';
import { config } from '../common/config';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../app/reducers'
import App from '../app/partials/App';

// App graphql resources
import schema from './data/schema';
import resolvers from './data/resolvers';

// SSR
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../common/routes';

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

// Use in dev only
app.use(webpackDevMiddleware(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

// Serve static files
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../app/assets')));

// Register graphql middleware
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  rootValue: resolvers,
  pretty: process.env.NODE_ENV !== 'production',
}));

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
    const store = createStore(reducer);

    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const component = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      // Grab the initial state from our Redux store
      //const preloadedState = store.getState()

      fetchData();

      // Waiting for data to be fetched before rendering
      async function fetchData() {
        const channels = await getChannels();

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
