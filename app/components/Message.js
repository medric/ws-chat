import React, { PropTypes, Component } from 'react';

const Message = ({ message }) => {
  console.log(message);
  return (
    <div>
      <span> { message.date } </span>
      <span> { message.text } </span>
    </div>
  );
}

export default Message;
