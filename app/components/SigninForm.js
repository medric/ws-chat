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
					<div className="signin-wrapper">
						<div className="page__container-content signin-container">
									<h2>ws</h2>
									<div className="col">
										<input type="text" placeholder="Username" value={ this.state.username }
											onChange={(event) => {
												this.setState({username: event.target.value});
											}}
										/>
										<button
										onClick={() => {
											this.props.signin(event, this.state.username);
										}}>
											Sign in
										</button>
									</div>
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
