import React from 'react';
import { connect } from 'react-redux';
import SignupForm from '../components/signup-form';
import AuthActions from '../actions/auth';

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  signup: (name, email, password) =>
    dispatch(AuthActions.signup(name, email, password)),
});

class SignupPage extends React.Component {
  render() {
    const { signup } = this.props;
    return (
      <div>
        <h1>Sign-up to Task Check-in</h1>
        <SignupForm signup={signup} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  signup: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
