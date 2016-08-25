const messages = (state, action) => {
    let newState = { ...state, ...action };

    return newState;
};

export default messages;
