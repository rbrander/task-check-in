import React from 'react';

const Header = ({ username, login, logout }) => (
  <div>
    <div>Task Check-in</div>
    { username === null ? (
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
);

Header.propTypes = {
  username: React.PropTypes.string,
  login: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
};

export default Header;