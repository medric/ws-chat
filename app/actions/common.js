/*
 * action types
 */
export const ADD_ROOM = 'ADD_ROOM';

function loadRoom(room) {
  return {
    type: ADD_ROOM,
    entry: room
  }
}

function fetchRooms() {
  return {
  }
}

/*
 * action creators
 */
export function addRoom(name) {
  if(window.socket) {
    let msg = {
      type: 'addRoom',
      name: name
    };

    window.socket.send(JSON.stringify(msg));
  }
}
