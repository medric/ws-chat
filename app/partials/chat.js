import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import Rooms from '../containers/rooms';
import ThreadMessages from '../containers/threadMessages';
import { ADD_ROOM, loadRoom } from '../actions/common';

class Chat extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    window.socket = window.socket || this._initSocket();
  }

  _initSocket() {
    const ws = new WebSocket('ws://localhost:3000/ws');

    ws.onopen = () => {
      console.log('Socket connection opened');
    };

    ws.onmessage = (msg) => {
      try {
        var data = JSON.parse(msg.data);
        console.log(data);
        this._handleData(data);
      } catch (e) {
      }
    }

    return ws;
  }

  _handleData(data) {
    // todo: data validation
    if(data.hasOwnProperty('type')) {
      switch (data.type) {
        case ADD_ROOM:
          console.log('new channel added');
          this.props.dispatch(loadRoom(data));
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
