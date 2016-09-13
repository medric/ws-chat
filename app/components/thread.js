import React, { PropTypes, Component } from 'react';
import Message from './Message';

class Thread extends Component {
	constructor(props) {
	   super(props);
	}

	// local state
	state = {
		messageInput: ''
	}

	componentWillMount() {
	}

	componentWillUnmount() {
	}

  componentWillUpdate () {
		console.log(this.props);
  }

  render() {
      return (
          <div className="page__container-content column">
							<div id="messages-thread">
								{
	                  this.props.messages.map(message => {
	                    return <Message key={message.id}
	                      {...message}
	                    />
	                  }, this)
	              }
							</div>
							<div>
									<textarea value={ this.state.messageInput }
										onChange={ (event) => {
											this.setState({messageInput: event.target.value});
										}}
									>  </textarea>
									<button
									onClick={ (event) => {
										this.props.sendMessage(event, this.state.messageInput, this.props.currentRoom);
									}}>
										Send
									</button>
							</div>
          </div>
      );
  }

}

Thread.propTypes = {
	messages: PropTypes.array,
	sendMessage: PropTypes.func,
	currentRoom: PropTypes.string
};

Thread.defaultProps = {
  messages: [],
  maxMessagesLimit: 10
};

export default Thread;
