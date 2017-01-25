import React from 'react';
import { connect } from 'react-redux';
import AuthActions from '../actions/auth';
import LoginForm from '../components/login-form';

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  login: (email, password) =>
    dispatch(AuthActions.login(email, password)),
});

class LoginPage extends React.Component {
  render() {
    const { login } = this.props;
    return (
      <div className="tl dib pa2">
        <h2 className="">Login</h2>
        <LoginForm login={login} />
      </div>
    )
  }
}

LoginPage.propTypes = {
  login: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);