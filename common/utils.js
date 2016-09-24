export function guid() {
  return ('0000' + (Math.random() * Math.pow(36,4) << 0).toString(36)).slice(-4);
}

// Actions types
export const ADD_ROOM = 'ADD_ROOM';
export const JOIN_ROOM = 'JOIN_ROOM';
export const REACH_ROOM = 'REACH_ROOM';
export const LOAD_ROOM = 'LOAD_ROOM';
export const FETCH_ROOMS = 'FETCH_ROOMS';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const LOAD_MESSAGE = 'LOAD_MESSAGE';
export const SIGN_IN = 'SIGN_IN';
export const SOCKET_ERROR = 'SOCKET_ERROR';
