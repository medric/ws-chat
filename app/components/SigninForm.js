import React, { PropTypes, Component } from 'react';

require('./style.scss');

class SigninForm extends Component {
	constructor(props) {
	   super(props);
	}

	static contextTypes = {
		router: PropTypes.object.isRequired
	}

	state = {
			username: ''
	}

	componentWillMount() {
		this.redirect();
	}

	componentWillUnmount() {
	}

	ComponentDidMount() {
		const { router } = this.context;
	}

	componentWillReceiveProps(newProps) {
		this.redirect(newProps);
	}

	redirect(props = this.props) {
		if(props.signedIn === true) {
			this.context.router.push('/chat');
		}
	}

  render() {
      return (
          <div id="signin-container" className="page__container-content row">
							<div className="">
									<input className="input-x" type="text" value={ this.state.username }
										onChange={(event) => {
											this.setState({username: event.target.value});
										}}
									/>
									<button
									onClick={() => {
										this.props.signin(event, this.state.username);
									}}>
										Send
									</button>
							</div>
          </div>
      );
  }

}

SigninForm.propTypes = {
	signin: PropTypes.func,
	signedIn: PropTypes.bool
};

export default SigninForm;
