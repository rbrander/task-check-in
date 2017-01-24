import React from 'react';
import { connect } from 'react-redux';
import AuthActions from '../actions/auth';

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  login: (email, password) =>
    dispatch(AuthActions.login(email, password)),
});

class LoginPage extends React.Component {
  render() {
    return (
      <h1>login page!!</h1>
    )
  }
}

LoginPage.propTypes = {
  login: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
