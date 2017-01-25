import React from 'react';
import { connect } from 'react-redux';
import AuthActions from '../actions/auth';
import LoginForm from '../components/login-form';

const mapStateToProps = (state) => ({
  hasError: !!state.User.error,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) =>
    dispatch(AuthActions.login(email, password)),
});

class LoginPage extends React.Component {
  render() {
    const { login, hasError } = this.props;
    return (
      <div className="tl dib pa2">
        <h2>Login</h2>
        { hasError ? (<div className="red">Invalid email or password</div>) : null }
        <LoginForm login={login} />
      </div>
    )
  }
}

LoginPage.propTypes = {
  login: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);