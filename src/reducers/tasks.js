import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR
} from '../constants/action-types';

const initialState = {
  list: [],
  isPending: false,
  error: '',
};

const tasksReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_TASKS_PENDING:
      return Object.assign({}, state, {
        isPending: true,
        error: '',
      });
    case GET_TASKS_SUCCESS:
      return Object.assign({}, state, {
        isPending: false,
        list: action.payload,
      });
    case GET_TASKS_ERROR:
      return Object.assign({}, state, {
        isPending: false,
        error: action.payload,
      });
    default:
      return state;
  }
};

export default tasksReducer;