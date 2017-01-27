import {
  CREATE_TASK_PENDING,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  ADD_TASK_COMPLETION_PENDING,
  ADD_TASK_COMPLETION_SUCCESS,
  ADD_TASK_COMPLETION_ERROR,
} from '../constants/action-types';

const initialState = {
  list: [],
  isPending: false,
  error: '',
  newTask: {},
};

const tasksReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    ///// Pending Actions
    case CREATE_TASK_PENDING:
      return Object.assign({}, state, {
        isPending: true,
        error: '',
        newTask: {},
      });

    case ADD_TASK_COMPLETION_PENDING:
    case GET_TASKS_PENDING:
      return Object.assign({}, state, {
        isPending: true,
        error: '',
      });

    ///// Success Actions
    case CREATE_TASK_SUCCESS:
      return Object.assign({}, state, {
        isPending: false,
        newTask: action.payload,
      });

    case GET_TASKS_SUCCESS:
      return Object.assign({}, state, {
        isPending: false,
        list: action.payload,
      });

    case ADD_TASK_COMPLETION_SUCCESS:
      return Object.assign({}, state, {
        list: state.list.map(task => task._id === action.payload._id ? action.payload : task),
        isPending: false,
      });

    ///// Error Actions
    case ADD_TASK_COMPLETION_ERROR:
    case CREATE_TASK_ERROR:
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