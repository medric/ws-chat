import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'store';
import Chat from './partials/chat';
import Signin from './containers/signin';
import { Router, Route, Link, hashHistory } from 'react-router'

// Load main from stylesheets so style is available for the components
//require('../stylesheets/sass/main.scss');
const initialState = window.__initialState__;
const store = configureStore(initialState);

console.log('store', store.getState());

// Render application to the DOM
ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} >
      <Route path='/' component={Signin} />
      <Route path="chat" component={Chat} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
