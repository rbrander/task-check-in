import {
  CREATE_TASK_PENDING,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR
} from '../constants/action-types';

const initialState = {
  list: [],
  isPending: false,
  error: '',
  newTask: {},
};

const tasksReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_TASK_PENDING:
      return Object.assign({}, state, {
        isPending: true,
        error: '',
        newTask: {},
      });
    case CREATE_TASK_SUCCESS:
      return Object.assign({}, state, {
        isPending: false,
        newTask: action.payload,
      });
    case CREATE_TASK_ERROR:
      return Object.assign({}, state, {
        isPending: false,
        error: action.payload,
      });
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