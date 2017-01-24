import {
  LOGIN_USER,
  LOGOUT_USER,
  SIGNUP_PENDING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR
} from '../constants/action-types';
import { apiPost } from '../utils';

const login = (username, password) => ({
  type: LOGIN_USER,
  payload: { username, password },
});

const logout = () => ({ type: LOGOUT_USER });

const signup = (name, email, password) => (dispatch) => {
  dispatch({ type: SIGNUP_PENDING });
  apiPost('/api/signup/', { name, email, password })
    .then(() => dispatch({ type: SIGNUP_SUCCESS }))
    .catch(error => dispatch({ type: SIGNUP_ERROR, payload: error }));
/*
  const formData = JSON.stringify({ name, email, password });
  fetch('/api/signup', {
    method: 'POST',
    redirect: 'follow',
    body: formData,
    headers: new Headers({ 'Content-Type': 'application/json'})
  }).then(() => {
      dispatch({ type: SIGNUP_SUCCESS });
    })
    .catch(error => {
      console.error('error!', error);
      dispatch({ type: SIGNUP_ERROR, payload: error });
    });
    */
};

export default {
  login,
  logout,
  signup,
};