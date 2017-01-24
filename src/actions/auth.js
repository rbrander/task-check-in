import {
  LOGIN_USER,
  LOGOUT_USER,
  SIGNUP_PENDING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR
} from '../constants/action-types';

const login = (username, password) => ({
  type: LOGIN_USER,
  payload: { username, password },
});

const logout = () => ({ type: LOGOUT_USER });

const signup = (name, email, password) => (dispatch) => {
  dispatch({ type: SIGNUP_PENDING });
  const formData = JSON.stringify({ name, email, password });
  fetch('/api/signup', { method: 'POST', redirect: 'follow', body: formData,headers: new Headers({
    'Content-Type': 'application/json'
  }) })
    .then(response => response.json())
    .then(json => {
      console.log('success', json)
      dispatch({ type: SIGNUP_SUCCESS, payload: json });
    })
    .catch(error => {
      console.error('error!', error);
      dispatch({ type: SIGNUP_ERROR, payload: error });
    });
};

export default {
  login,
  logout,
  signup,
};