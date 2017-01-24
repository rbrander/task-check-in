import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import './index.css';
import 'tachyons';

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger, reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
