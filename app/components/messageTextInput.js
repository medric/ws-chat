import React, { PropTypes, Component } from 'react';

class MessageTextInput extends Component {
  propTypes: {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
  },

  constructor(props) {
		super(props);
	}

	render() {
		return (
		);
	}
}

export default Message;
