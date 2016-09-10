/*
 * action types
 */
export const ADD_ROOM = 'ADD_ROOM';
export const LOAD_ROOM = 'LOAD_ROOM';
export const FETCH_ROOMS = 'FETCH_ROOMS';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SIGN_IN = 'SIGN_IN';

/*
 * action creators
 */
export function signin(username) {
  return dispatch => {
    fetch('/signin', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username
      })
    })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      dispatch(signedIn(data));
    });
  }
}

export function signedIn(data) {
  let action = Object.assign({}, {data},  {type: SIGN_IN, signedIn: true});
  return action;
}

export function addRoom(name) {
  if(window.socket) {
    let msg = {
      type: ADD_ROOM,
      name: name
    };

    window.socket.send(JSON.stringify(msg));
  }
}

export function sendMessage(user, text, roomId) {
  if(window.socket) {
    let msg = {
      type: 'NEW_MESSAGE',
      user: user,
      text: text,
      roomId: roomId,
      date: new Date(),
    };

    window.socket.send(JSON.stringify(msg));
  }
}

export function loadRoom(room) {
  let action = Object.assign({}, room, {type: LOAD_ROOM})
  return action;
}

function fetchRooms() {
  return {
  }
}
