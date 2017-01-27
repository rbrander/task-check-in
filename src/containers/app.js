import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import AuthActions from '../actions/auth';

const mapStateToProps = (state) => ({
  userName: state.User.name,
  isLoggedIn: (state.User._id !== null && state.User._id.length > 0),
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(AuthActions.logout()),
});

class App extends React.Component {
  static propTypes = {
    userName: React.PropTypes.string,
    isLoggedIn: React.PropTypes.bool.isRequired,
    logout: React.PropTypes.func.isRequired,
    children: React.PropTypes.node,
  }

  componentWillReceiveProps(nextProps) {
    const { isLoggedIn } = this.props;

    const justLoggedOut = (isLoggedIn && !nextProps.isLoggedIn);
    if (justLoggedOut) {
      nextProps.router.push('/');
    }

    const justLoggedIn = (!isLoggedIn && nextProps.isLoggedIn);
    if (justLoggedIn) {
      // redirect the user home
      nextProps.router.push('/tasks');
    }
    // TODO: if they try to access a secured page, redirect to login (e.g. /tasks )
  }

  render() {
    // The content is determiend by logged in state
    // When not logged in, show instructions on joining
    // When logged in, show a list of their goals, and create buttons
    const { userName, isLoggedIn, logout, children, location } = this.props;
    const defaultContent = (
      <div className="tc">
        <h1>Task Check-in</h1>
        <div className="f5 mb4">A task progression tracker</div>
      </div>
    );
    return (
      <div>
        <Header
          userName={ userName }
          isLoggedIn={ isLoggedIn }
          logout={ logout }
          location={ location }
        />
        <div className="pa2 tc">
          { children || defaultContent }
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
