import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import Rooms from '../containers/rooms';
import ThreadMessages from '../containers/threadMessages';
import { config } from '../../common/config';

import { loadRoom, loadMessage } from '../actions/common';

import {
  ADD_ROOM,
  LOAD_ROOM,
  FETCH_ROOMS,
  SEND_MESSAGE,
  LOAD_MESSAGE,
  SIGN_IN
} from '../../common/utils';

class Chat extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    window.socket = window.socket || this.initSocket();
  }

  initSocket() {
    const ws = new WebSocket(`ws://${config.host}:${config.port}/ws`);

    ws.onopen = () => {
      console.log('Socket connection opened');
    };

    ws.onmessage = (msg) => {
      try {
        var data = JSON.parse(msg.data);
        this.handleData(data);
      } catch (e) {
      }
    }

    return ws;
  }

  handleData(data) {
    // todo: data validation
    if(data.hasOwnProperty('type')) {
      switch (data.type) {
        case ADD_ROOM:
          this.props.dispatch(loadRoom(data));
          break;
        case SEND_MESSAGE:
          this.props.dispatch(loadMessage(data));
          break;
        default:
      }
    }
  }

  render () {
    return (
      <div>
        <Rooms />
        <ThreadMessages />
      </div>
     )
  }
}

Chat = connect()(Chat);

export default Chat;
