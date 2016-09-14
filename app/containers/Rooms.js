import { connect } from 'react-redux';
import RoomList from '../components/RoomList';
import { addRoom } from '../actions/common';

const mapDispatchToProps = (dispatch) => {
  return {
    addRoom : (event, name) => {
  		event.preventDefault();
      dispatch(addRoom(name));
  	}
  }
}

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms
  }
};

const Rooms = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomList);

export default Rooms;
