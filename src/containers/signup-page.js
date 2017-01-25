import React from 'react';
import { connect } from 'react-redux';
import SignupForm from '../components/signup-form';
import AuthActions from '../actions/auth';

const mapStateToProps = (state) => ({
  hasError: !!state.User.signupError,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (name, email, password) =>
    dispatch(AuthActions.signup(name, email, password)),
});

class SignupPage extends React.Component {
  render() {
    const { signup, hasError } = this.props;
    return (
      <div className="tl dib pa2">
        <h2>Sign-up</h2>
        { hasError ? (<div className="red">An account already exists for that email</div>) : null }
        <SignupForm signup={signup} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  signup: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
