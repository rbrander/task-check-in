import { LOGIN_USER, LOGOUT_USER } from '../constants/action-types';

const initialState = {
  username: null,
};

const App = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, { username: action.payload.username });
    case LOGOUT_USER:
      return Object.assign({}, state, { username: null });
    default:
      break;
  }
  return state;
}

export default App;