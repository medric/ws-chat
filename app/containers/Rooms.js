import { connect } from 'react-redux';
import RoomList from '../components/RoomList';
import { addRoom, joinRoom } from '../actions/common';

const mapDispatchToProps = (dispatch) => {
  return {
    addRoom : (event, name) => {
  		event.preventDefault();
      dispatch(addRoom(name));
  	},
    joinRoom : (event, name) => {
      event.preventDefault();
      dispatch(joinRoom(name));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentRoom: state.currentRoom,
    rooms: state.rooms
  }
};

const Rooms = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomList);

export default Rooms;
