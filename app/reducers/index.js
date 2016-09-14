import {
  ADD_ROOM,
  LOAD_ROOM,
  FETCH_ROOMS,
  SEND_MESSAGE,
  SIGN_IN,
  LOAD_MESSAGE
} from '../../common/utils';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ROOMS:
      break;
    case LOAD_ROOM:
      delete action.type;

      let rooms = { rooms : [...state.rooms, action], currentRoom : action.name };
      state = {...state, ...rooms };

      break;
    case LOAD_MESSAGE:
      delete action.type;

      let messages = { messages : [...state.messages, action] };
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
