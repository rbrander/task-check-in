import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app';
import Signup from './containers/signup-page';
import Login from './containers/login-page';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import './index.css';
import 'tachyons';

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger, reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="signup" component={Signup} />
        <Route path="login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
