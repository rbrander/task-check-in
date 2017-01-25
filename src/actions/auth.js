import {
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  SIGNUP_PENDING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR
} from '../constants/action-types';
import { apiPost } from '../utils';

const login = (email, password) => (dispatch) => {
  dispatch({ type: LOGIN_USER_PENDING });
  apiPost('/api/login', { email, password })
    .then(userProfile => dispatch({ type: LOGIN_USER_SUCCESS, payload: userProfile }))
    .catch(error => dispatch({ type: LOGIN_USER_ERROR, payload: error }));
};

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