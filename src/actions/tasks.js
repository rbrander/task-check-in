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

const getTasks = () => (dispatch, getState) => {
  dispatch({ type: GET_TASKS_PENDING });
  apiGet('/api/tasks?owner_id=' + getState().User._id)
    .then(tasks => dispatch({ type: GET_TASKS_SUCCESS, payload: tasks }))
    .catch(error => {
      if (process.env.NODE_ENV === 'development')
        dispatch({
          type: GET_TASKS_SUCCESS,
          payload: [
            {
              _id: '1',
              name: 'My first task',
              description: '...and then there was one.',
              progress: 'not yet started',
              startDate: '2017-01-01',
              endDate: '2017-12-31',
              goal: '30 days',
              completions: [],
            },
            {
              _id: '2',
              name: 'My second task',
              description: 'blah blah blah',
              progress: 'not yet started',
              startDate: '2017-01-01',
              endDate: '2018-12-31',
              goal: '60 days',
              completions: ['2017-01-26T00:00:00.000Z'],
            },
          ],
        });
      else
        dispatch({ type: GET_TASKS_ERROR, payload: error })
    });
};

const addCompletion = (task_id, date) => (dispatch) => {
  dispatch({ type: ADD_TASK_COMPLETION_PENDING });
  apiPost('/api/task/completed', { task_id, date })
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