// index.js -- main reducers file that combines all reducers into one
import Tasks from './tasks';
import User from './user';
import { combineReducers } from 'redux';

export default combineReducers({
  Tasks,
  User,
});