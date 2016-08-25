import { connect } from 'react-redux';
import { Thread } from '../components/thread';

const getLastMessages = (messages, filter) => {
};

const mapStateToProps = (state) => {
  return {
    messages: state.messages.entries
  }
};

const ThreadMessages = connect(
  mapStateToProps,
  mapDispatchToProps
)(Thread);

export default ThreadMessages
