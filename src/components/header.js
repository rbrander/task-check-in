import React from 'react';

const Header = ({ username, isLoggedIn, login, logout }) => (
  <div className="bg-light-blue cf">
    <div className="f3 fl ma2">
      <a href="/" className="no-underline black">Task Check-in</a>
    </div>
    <div className="f6 fr ma3">
    { !isLoggedIn ? (
      <span>
        <a href="#" onClick={() => login('Anonymous')}>Login</a>
        <span> | </span>
        <a href="#">Sign Up</a>
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
  username: React.PropTypes.string,
  isLoggedIn: React.PropTypes.bool.isRequired,
  login: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
};

export default Header;