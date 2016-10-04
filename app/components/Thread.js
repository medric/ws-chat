import React, { PropTypes, Component } from 'react';
import Message from './Message';
import createFragment from 'react-addons-create-fragment';

class Thread extends Component {
	constructor(props) {
		super(props);
	}

	// local state
	state = {
		messageInput: ''
	}

	componentWillReceiveProps(newProps) {
	}

	render() {
		return (
			<div className="page__container-content column message-input">
				<div className="messages-thread">
					{this.props.messages}
				</div>
				<div className="page__container-content__wrapper">
					<form className="row page__container-content__wrapper-form">
						<textarea
							className="flg-10"
							value={this.state.messageInput}
							onChange={ (event) => {
								this.setState({messageInput: event.target.value});
							}}
							>  </textarea>
							<button className="flg-1"
								onClick={ (event) => {
									this.props.sendMessage(event, this.state.messageInput, this.props.currentRoom);
								}}>
								Send
							</button>
						</form>
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
