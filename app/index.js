import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'store';
import Rooms from './containers/rooms';

// Load main from stylesheets so style is available for the components
//require('../stylesheets/sass/main.scss');

const initialState = window.__initialState__;
const store = configureStore();

window.socket = initSocket(initialState);

// Render application to the DOM
ReactDOM.render(
  <Provider store={store}>
    <Rooms />
  </Provider>,
  document.getElementById('app')
);

function initSocket() {
  const ws = new WebSocket('ws://localhost:3000/ws');

  ws.onopen = () => {
    console.log('Socket connection opened');
  };

  ws.onmessage = (evt) => {
    console.log(evt);
  }
  
  return ws;
}
