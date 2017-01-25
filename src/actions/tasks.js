import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR
} from '../constants/action-types';
import { apiGet } from '../utils';

const getTasks = () => (dispatch) => {
  dispatch({ type: GET_TASKS_PENDING });
  apiGet('/api/tasks')
    .then(tasks => dispatch({ type: GET_TASKS_SUCCESS, payload: tasks }))
    .catch(error => dispatch({ type: GET_TASKS_ERROR, payload: error }));
};

export default {
  getTasks,
};