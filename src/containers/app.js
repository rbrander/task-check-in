import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import AuthActions from '../actions/auth';
import TaskList from '../components/task-list';
import TaskForm from '../components/task-form';
import Calendar from '../components/calendar';

const mapStateToProps = (state) => ({
  username: state.App.username,
  isLoggedIn: (state.App.username !== null),
  tasks: state.App.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(AuthActions.login(username, password)),
  logout: () => dispatch(AuthActions.logout()),
});

const App = ({ username, isLoggedIn, login, logout, tasks }) => {
  // The content is determiend by logged in state
  // When not logged in, show instructions on joining
  // When logged in, show a list of their goals, and create buttons
  return (
    <div>
      <Header username={username} isLoggedIn={isLoggedIn} login={login} logout={logout} />
      <div className="tc">
        <h1>Task Check-in</h1>
        <div className="f5 mb4">A task progression tracker</div>
        { isLoggedIn ? <TaskList tasks={tasks} /> : <div /> }
        <div className="pv3"><Calendar year="2016" month="11" /></div>
        <div className="pv3"><Calendar year="2016" month="12" /></div>
        <div className="pv3"><Calendar year="2017" month="1" /></div>
        <div className="pv3"><Calendar year="2017" month="2" /></div>
      </div>
    </div>
  );
};

App.propTypes = {
  username: React.PropTypes.string,
  isLoggedIn: React.PropTypes.bool.isRequired,
  login: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
  tasks: React.PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
