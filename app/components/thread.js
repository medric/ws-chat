import React, { PropTypes, Component } from 'react';
import Message from './message';

class Thread extends Component {
	state = {
		messages: '',
		messages: []
	};

	constructor(props) {
	   super(props);
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
          </div>
      );
  }

}

PostsList.propTypes = {
	messages: PropTypes.array
};

PostsList.defaultProps = {
  messages: [],
  maxMessagesLimit: 10
};

export default Thread;
