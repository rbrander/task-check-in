import React from 'react';
import { Link } from 'react-router';

const Header = ({ username, isLoggedIn, login, logout }) => (
  <div className="bg-light-blue cf">
    <div className="f3 fl ma2">
      <Link to="/" className="no-underline black">Task Check-in</Link>
    </div>
    <div className="f6 fr ma3">
    { !isLoggedIn ? (
      <span>
        <Link to="/login">Login</Link>
        <span> | </span>
        <Link to="/signup">Sign Up</Link>
      </span>
      ) : (
      <span>
        Hello, {username}
        <span> | </span>
        <a href="#" onClick={() => logout()}>Logout</a>
      </span>
      )
    }
    </div>
  </div>
);

Header.propTypes = {
  username: React.PropTypes.string, // TODO: convert this to 'name'
  isLoggedIn: React.PropTypes.bool.isRequired,
  logout: React.PropTypes.func.isRequired,
};

export default Header;