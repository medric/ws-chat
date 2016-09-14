import { connect } from 'react-redux';
import SigninForm from '../components/SigninForm';
import { signin } from '../actions/common';

const mapDispatchToProps = (dispatch) => {
  return {
    signin: (event, name) => {
  		event.preventDefault();
      dispatch(signin(name));
  	}
  }
}

const mapStateToProps = (state) => {
  return {
    signedIn: state.signedIn,
  }
};

const Signin = connect(
  mapStateToProps,
  mapDispatchToProps
)(SigninForm);

export default Signin;
