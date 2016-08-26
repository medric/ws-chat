import { connect } from 'react-redux';
import Thread from '../components/thread';
import { sendMessage } from '../actions/common';

const getLastMessages = (messages, filter) => {
};

const mapDispatchToProps = (dispatch, ...args) => {

  return {
    sendMessage: (event, text, roomId) => {
  		event.preventDefault();
      dispatch(sendMessage(null, text, roomId));
  	}
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    currentRoom: state.currentRoom
  }
};

const ThreadMessages = connect(
  mapStateToProps,
  mapDispatchToProps
)(Thread);

export default ThreadMessages
