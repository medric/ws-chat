/*
* action types
*/
import {
  ADD_ROOM,
  LOAD_ROOM,
  FETCH_ROOMS,
  SEND_MESSAGE,
  SIGN_IN,
  LOAD_MESSAGE
} from '../../common/utils';

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

    send(JSON.stringify(msg));
    return msg;
  } else {
    // type err
  }
}

export function sendMessage(text, roomId) {
  if(window.socket) {
    let msg = {
      type: SEND_MESSAGE,
      text: text,
      roomId: roomId,
      date: new Date(),
    };

    send(JSON.stringify(msg));
    return msg;
  }
}

export function loadRoom(room) {
  let action = Object.assign({}, room, {type: LOAD_ROOM});
  return action;
}

export function loadMessage(message) {
  let action = Object.assign({}, message, {type: LOAD_MESSAGE});
  return action;
}

function fetchRooms() {
  return {
  }
}

function send(data) {
  try {
    window.socket.send(data);
  } catch (error) {
    console.log(Object.prototype.toString.call(error));
  }
}
