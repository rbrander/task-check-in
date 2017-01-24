import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import AuthActions from '../actions/auth';
import TaskList from '../components/task-list';

const mapStateToProps = (state) => ({
  username: state.App.username,
  isLoggedIn: (state.App.username !== null),
  tasks: state.App.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(AuthActions.logout()),
});

class App extends React.Component {
  render() {
    // The content is determiend by logged in state
    // When not logged in, show instructions on joining
    // When logged in, show a list of their goals, and create buttons
    const { username, isLoggedIn, logout, tasks, children } = this.props;
    const defaultContent = (
      <div className="tc">
        <h1>Task Check-in</h1>
        <div className="f5 mb4">A task progression tracker</div>
        {(isLoggedIn ? <TaskList tasks={tasks} /> : <div />)}
      </div>
    );
    return (
      <div>
        <Header username={username} isLoggedIn={isLoggedIn} logout={logout} />
        { children || defaultContent }
      </div>
    );
  }
};

App.propTypes = {
  username: React.PropTypes.string, // TODO: convert this to email
  isLoggedIn: React.PropTypes.bool.isRequired,
  logout: React.PropTypes.func.isRequired,
  tasks: React.PropTypes.array.isRequired,
  children: React.PropTypes.node,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
