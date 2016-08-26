import React, { PropTypes, Component } from 'react';

class Message extends Component {
  propTypes: {
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.object.isRequired
  }

  constructor(props) {
		super(props);
	}

	render() {
		
	}
}

export default Message;
