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
import { apiGet, apiPost } from '../utils';
import { mockTasks } from '../constants/mock';

const getTasks = () => (dispatch, getState) => {
  dispatch({ type: GET_TASKS_PENDING });
  apiGet('/api/tasks?owner_id=' + getState().User._id)
    .then(tasks => { dispatch({ type: GET_TASKS_SUCCESS, payload: tasks }); })
    .catch(error => {
      if (process.env.NODE_ENV === 'development')
        dispatch({ type: GET_TASKS_SUCCESS, payload: mockTasks });
      else
        dispatch({ type: GET_TASKS_ERROR, payload: error })
    });
};

const addCompletion = (task_id, date) => (dispatch) => {
  dispatch({ type: ADD_TASK_COMPLETION_PENDING });
  apiPost('/api/task/completed', { task_id, date: date.toISOString() })
    .then(task => dispatch({ type: ADD_TASK_COMPLETION_SUCCESS, payload: task }))
    .catch(error => dispatch({ type: ADD_TASK_COMPLETION_ERROR, payload: error }))
}

const createTask = (task) => (dispatch, getState) => {
  dispatch({ type: CREATE_TASK_PENDING });
  const data = Object.assign({}, task, { owner_id: getState().User._id });
  apiPost('/api/task/create', data)
    .then(task => dispatch({ type: CREATE_TASK_SUCCESS, payload: task }))
    .catch(error => {
      if (process.env.NODE_ENV === 'development') {
        return dispatch({ type: CREATE_TASK_SUCCESS, payload: {
          _id: ~~(Math.random() * 999) + 5, name: 'booga'
        } });
      } else {
        return dispatch({ type: CREATE_TASK_ERROR, payload: error });
      }
    })
}

export default {
  getTasks,
  createTask,
  addCompletion,
};