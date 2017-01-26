import {
  CREATE_TASK_PENDING,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR
} from '../constants/action-types';
import { apiGet, apiPost } from '../utils';

const getTasks = () => (dispatch) => {
  dispatch({ type: GET_TASKS_PENDING });
  apiGet('/api/tasks')
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
            },
            {
              _id: '2',
              name: 'My second task',
              description: 'blah blah blah',
              progress: 'not yet started',
              startDate: '2017-01-01',
              endDate: '2018-12-31',
              goal: '60 days',
            },
          ],
        });
      else
        dispatch({ type: GET_TASKS_ERROR, payload: error })
    });
};

const createTask = (task) => (dispatch) => {
  dispatch({ type: CREATE_TASK_PENDING });
  apiPost('/api/task/create', task)
    .then(task => dispatch({ type: CREATE_TASK_SUCCESS, payload: task }))
    .then(() => dispatch(getTasks()))
    .catch(error => dispatch({ type: CREATE_TASK_ERROR, payload: error }))
}

export default {
  getTasks,
  createTask,
};