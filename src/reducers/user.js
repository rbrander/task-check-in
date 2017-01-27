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

const initialState = {
  _id: '',
  name: '',
  email: '',
  isPending: false, // shared between signup and login
  loginError: '',
  logoutError: '',
  signupError: '',
}

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SIGNUP_PENDING:
      return Object.assign({}, state, {
        isPending: true,
        signupError: '',
      });
    case SIGNUP_ERROR:
      return Object.assign({}, state, {
        isPending: false,
        signupError: action.payload,
      });
    case LOGIN_USER_PENDING:
      return Object.assign({}, state, {
        isPending: true,
        loginError: '',
      });
    case SIGNUP_SUCCESS: // upon signup, the user will be logged in, and have userProfile
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, action.payload, {
        isPending: false,
      });
    case LOGIN_USER_ERROR:
      return Object.assign({}, state, {
        loginError: action.payload,
        isPending: false,
      });
    case LOGOUT_USER_PENDING:
      return Object.assign({}, state, {
        isPending: true,
        logoutError: '',
      });
    case LOGOUT_USER_SUCCESS:
      return initialState;
    case LOGOUT_USER_ERROR:
      return Object.assign({}, state, {
        loginError: action.payload,
        isPending: false,
      });
    default:
      return state;
  }
}

export default userReducer;