import { ADD_ROOM, LOAD_ROOM, FETCH_ROOMS, SEND_MESSAGE } from '../actions/common';

const reducer = (state, action) => {
  console.log(action, state);
  switch (action.type) {
    //return { ...state, rooms: [...state.rooms, [action]] };
    case FETCH_ROOMS:
      break;
    case LOAD_ROOM:
      delete action.type;

      let rooms = { rooms : [...state.rooms, action], currentRoom : action.name };
      let newState = {...state, ...rooms };

      return newState;
      break;
    case SEND_MESSAGE:
      break;
    default:
      return state;
  }
};

export default reducer;
