import {
  SIGNUP_PENDING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER_PENDING,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR
} from '../constants/action-types';
import { apiGet, apiPost } from '../utils';
import { mockUser } from '../constants/mock';

const login = (email, password) => (dispatch) => {
  dispatch({ type: LOGIN_USER_PENDING });
  apiPost('/api/login', { email, password })
    .then(userProfile => dispatch({ type: LOGIN_USER_SUCCESS, payload: userProfile }))
    .catch(error => {
      if (process.env.NODE_ENV === 'development')
        dispatch({ type: LOGIN_USER_SUCCESS, payload: mockUser });
      else
        dispatch({ type: LOGIN_USER_ERROR, payload: error });
    });
};

const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER_PENDING });
  apiGet('/api/logout')
    .then(() => dispatch({ type: LOGOUT_USER_SUCCESS }))
    .catch(error => dispatch({ type: LOGOUT_USER_ERROR, payload: error }));
};

const signup = (name, email, password) => (dispatch) => {
  dispatch({ type: SIGNUP_PENDING });
  apiPost('/api/signup/', { name, email, password })
    .then((userProfile) => dispatch({ type: SIGNUP_SUCCESS, payload: userProfile }))
    .catch(error => dispatch({ type: SIGNUP_ERROR, payload: error }));
};

export default {
  login,
  logout,
  signup,
};