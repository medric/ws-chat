import {
  ADD_ROOM,
  JOIN_ROOM,
  REACH_ROOM,
  LOAD_ROOM,
  FETCH_ROOMS,
  SEND_MESSAGE,
  SIGN_IN,
  LOAD_MESSAGE
} from '../../common/utils';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ROOMS:
      break
    case LOAD_ROOM:
      var rooms = { rooms : [...state.rooms, action], currentRoom : action.room };
      state = {...state, ...rooms };

      break;
    case REACH_ROOM:
      state = Object.assign({}, state, {
        currentRoom: action.room,
        messages: action.messages
      });

      console.log(action, state);
      
      break;
    case LOAD_MESSAGE:
      var messages = { messages : [...state.messages, action] };
      state = {...state, ...messages };

      break;
    case SIGN_IN:
      state = Object.assign({}, state, {
        signedIn: true
      });

      break;
    default:
      return state;
  }

  return state;
};

export default reducer;
