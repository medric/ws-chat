/*
* Action types
*/
import {
  ADD_ROOM,
  JOIN_ROOM,
  LOAD_ROOM,
  REACH_ROOM,
  FETCH_ROOMS,
  SEND_MESSAGE,
  SIGN_IN,
  LOAD_MESSAGE,
  SOCKET_ERROR
} from '../../common/utils';

/*
* Action creators
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
    return {
      type: SOCKET_ERROR
    }
  }
}

export function joinRoom(name) {
  if(window.socket) {
    let msg = {
      type: JOIN_ROOM,
      name: name
    };

    send(JSON.stringify(msg));
    return msg;
  } else {
    return {
      type: SOCKET_ERROR
    }
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
  console.log(room);
  let action = Object.assign({}, room, {type: LOAD_ROOM});
  return action;
}

export function reachRoom(data) {
  let action = Object.assign({}, data, {type: REACH_ROOM});
  return action;
}

export function loadMessage(message) {
  let action = Object.assign({}, message, {type: LOAD_MESSAGE});
  return action;
}

function send(data) {
  try {
    window.socket.send(data);
  } catch (error) {
    console.log(Object.prototype.toString.call(error));
  }
}
