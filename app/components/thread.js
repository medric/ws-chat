import React, { PropTypes, Component } from 'react';
import Message from './message';

class Thread extends Component {
	constructor(props) {
	   super(props);
	}

	state = {
		currentMessage: ''
	}

	componentWillMount() {
	}

	componentWillUnmount() {
	}

  componentWillUpdate () {
  }

  render() {
      return (
          <div className="page__container-content row">
              {
                  this.props.messages.map(message => {
                    return <Message key={message.id}
                      {...message}
                    />
                  }, this)
              }

							<div>
									<input type="text" value={ this.state.currentMessage }
										onChange={(event) => {
											this.setState({currentMessage: event.target.value});
										}}
									/>
									<button
									onClick={() => {
										this.props.sendMessage(event, this.state.currentMessage, this.props.currentRoom);
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
