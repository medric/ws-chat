import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'store';
import Chat from './partials/chat';
import { ADD_ROOM, loadRoom } from './actions/common';

// Load main from stylesheets so style is available for the components
//require('../stylesheets/sass/main.scss');
const initialState = window.__initialState__;
const store = configureStore(initialState);

window.socket = initSocket();

console.log('store', store.getState());

// Render application to the DOM
ReactDOM.render(
  <Provider store={store}>
    <Chat />
  </Provider>,
  document.getElementById('app')
);

function initSocket() {
  const ws = new WebSocket('ws://localhost:3000/ws');

  ws.onopen = () => {
    console.log('Socket connection opened');
  };

  ws.onmessage = (msg) => {
    try {
      var data = JSON.parse(msg.data);
      handleData(data);
    } catch (e) {
    }
  }

  return ws;
}

function handleData(data) {
  // todo: data validation
  if(data.hasOwnProperty('type')) {
    switch (data.type) {
      case ADD_ROOM:
        console.log('new channel added');
        store.dispatch(loadRoom(data));
        break;
      default:
    }
  }
}
