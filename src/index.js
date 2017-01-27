import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/app';
import Signup from './containers/signup-page';
import Login from './containers/login-page';
import Tasks from './containers/tasks-page';
import TaskView from './containers/task-view-page';
import TaskCreate from './containers/task-create-page';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router';

import reduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';

import './index.css';
import 'tachyons';


const logger = createLogger();
const store = createStore(rootReducer,
  (process.env.NODE_ENV === 'development' ?
    applyMiddleware(logger, reduxThunk) :
    applyMiddleware(reduxThunk)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="signup" component={Signup} />
        <Route path="login" component={Login} />
        <Route path="tasks" component={Tasks} />
        <Route path="task/view/:id" component={TaskView} />
        <Route path="task/create" component={TaskCreate} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
