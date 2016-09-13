import React, { PropTypes, Component } from 'react';

class Message extends Component {
  constructor(props) {
		super(props);
	}

  componentDidMount() {
    console.log(this);
  }

	render() {
    return (
      <div>
        <span> { this.props.text } </span>
      </div>
    );
	}
}

Message.propTypes = {
	text: PropTypes.string.isRequired,
};


export default Message;
