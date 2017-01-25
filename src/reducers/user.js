import {
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER
} from '../constants/action-types';

const initialState = {
  name: '',
  email: '',
  isPending: false,
  error: '',
}

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_USER_PENDING:
      return Object.assign({}, state, {
        isPending: true,
      });
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        name: action.payload.name,
        email: action.payload.email,
        isPending: false,
      });
    case LOGIN_USER_ERROR:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
      });
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
}

export default userReducer;