import { connect } from 'react-redux';
import Thread from '../components/Thread';
import { sendMessage } from '../actions/common';
import createFragment from 'react-addons-create-fragment';
import React from 'react';
import Message from '../components/Message';

const getLastMessages = (messages, filter) => {
};

const mapDispatchToProps = (dispatch, ...args) => {
  return {
    sendMessage: (event, text, roomId) => {
      event.preventDefault();
      dispatch(sendMessage(text, roomId));
    }
  }
}

const mapStateToProps = (state) => {
  let messagesArray = state.messages;
  let messages = {};

  messagesArray.forEach((e, key) => {
    messages[`${e.id}`] =
          <Message message={e}/>;
  });

  messages = createFragment(messages);

  return {
    messages: messages,
    currentRoom: state.currentRoom
  }
};

const ThreadMessages = connect(
  mapStateToProps,
  mapDispatchToProps
)(Thread);

export default ThreadMessages
