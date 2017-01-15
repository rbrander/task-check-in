import { LOGIN_USER, LOGOUT_USER } from '../constants/action-types';

const login = (username, password) => ({
  type: LOGIN_USER,
  payload: { username, password },
});

const logout = () => ({ type: LOGOUT_USER });

export default {
  login,
  logout,
};