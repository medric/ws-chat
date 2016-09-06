import { ADD_ROOM, LOAD_ROOM, FETCH_ROOMS, SEND_MESSAGE, SIGN_IN} from '../actions/common';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_ROOMS:
      break;
    case LOAD_ROOM:
      delete action.type;

      var rooms = { rooms : [...state.rooms, action], currentRoom : action.name };
      var newState = {...state, ...rooms };

      return newState;
    case SEND_MESSAGE:
    case SIGN_IN:
      var newState = Object.assign({}, state, {
        signedIn: true
      });

      return newState;
    default:
      return state;
  }
};

export default reducer;
