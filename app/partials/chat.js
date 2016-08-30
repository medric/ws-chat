import React, { PropTypes, Component } from 'react';
import Rooms from '../containers/rooms';
import ThreadMessages from '../containers/threadMessages';

class Chat extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render () {
    return (
      <div>
        <Rooms />
        <ThreadMessages />
        <SigninForm />
      </div>
     )
  }
}

export default Chat;
