import {
  ADD_ROOM,
  LOAD_ROOM,
  FETCH_ROOMS,
  SEND_MESSAGE,
  SIGN_IN,
  LOAD_MESSAGE
} from '../../common/utils';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_ROOMS:
      break;
    case LOAD_ROOM:
      delete action.type;

      var rooms = { rooms : [...state.rooms, action], currentRoom : action.name };
      var newState = {...state, ...rooms };

      return newState;
    case LOAD_MESSAGE:
      delete action.type;

      var messages = { messages : [...state.messages, action] };
      var newState = {...state, ...messages };
      
      return newState;
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
