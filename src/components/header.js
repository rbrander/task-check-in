import React from 'react';
import { Link } from 'react-router';

const listItemClassName = 'ml2 br2 bg-lightest-blue grow pointer pv2';
const listItemAnchorClassName = 'dim pv2 ph3 black-80 link';

const Header = ({ location: { pathname }, userName, isLoggedIn, logout }) => (
  <div className="bg-light-blue shadow-5 bb b--light-silver flex space-between items-center pa3 flex-column flex-row-ns fixed top-0 left-0 right-0">
    <div className="f3">
      <Link to="/" className="no-underline black">Task Check-in</Link>
    </div>
    <div className="f4 flex-auto ph2">
    { isLoggedIn ? (
        <ul className="list mv0 flex flex-row">
          <li className={ listItemClassName }>
            <Link to="/tasks" className={ listItemAnchorClassName }>Tasks</Link>
          </li>
          <li className={ listItemClassName }>
            <Link to="/task/create" className={ listItemAnchorClassName }>New Task</Link>
          </li>
        </ul>
      ) : null
    }
    </div>
    <div className="f6">
      <span>
        { isLoggedIn ? (
            <span>Hello, { userName }</span>
          ) : (
            pathname === '/login' ? (
              <span>Login</span>
            ) : (
              <Link to="/login" className="no-underline black">Login</Link>
            )
          )
        }
        <span> :: </span>
        { isLoggedIn ? (
            <button
              style={{ background: 'transparent', border: 'none', padding: 0 }}
              type="button"
              onClick={() => logout()}
            >Logout</button>
          ) : (
            <Link to="/signup" className="no-underline black">Sign Up</Link>
          )
        }
      </span>
    </div>
  </div>
);

Header.propTypes = {
  userName: React.PropTypes.string.isRequired,
  isLoggedIn: React.PropTypes.bool.isRequired,
  logout: React.PropTypes.func.isRequired,
};

export default Header;