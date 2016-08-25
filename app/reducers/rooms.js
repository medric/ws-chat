import { ADD_ROOM } from '../actions/common';

const rooms = (state, action) => {
    let newState = { ...state, ...action };

    console.log(state, action);
    return newState;
};

export default rooms;
