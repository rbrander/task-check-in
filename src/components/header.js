import React from 'react';
import { Link } from 'react-router';

const Header = ({ location: { pathname }, userName, isLoggedIn, logout }) => (
  <div className="bg-light-blue cf shadow-5 mb3 bb b--light-silver h3">
    <div className="f3 fl ma2">
      <Link to="/" className="no-underline black">Task Check-in</Link>
    </div>
    { isLoggedIn ? (
      <div className="ml4 fl f4">
        <ul className="list mt0">
          <li className="fl pa2 ma1 ba"><Link to="/tasks" className="no-underline black">Tasks</Link></li>
          <li className="fl pa2 ma1 ba"><Link to="/task/create" className="no-underline black">New Task</Link></li>
        </ul>
      </div>) : null
    }
    <div className="f6 fr ma3">
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
        <span> | </span>
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