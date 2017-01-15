import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import AuthActions from '../actions/auth';

const mapStateToProps = (state) => ({
  username: state.App.username,
});

const App = ({ username, login, logout }) => {
  return (
    <div>
      <Header username={username} login={login} logout={logout} />
      <div className="tc">
        <div className="f1">Task Check-in</div>
        <div>A task progression tracker</div>
      </div>
    </div>
  );
};

App.propTypes = {
  username: React.PropTypes.string,
  login: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, AuthActions)(App);
