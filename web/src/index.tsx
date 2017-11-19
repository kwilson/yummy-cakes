import * as React from 'react';
const { composeWithDevTools } = require('redux-devtools-extension');

import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import reducer from './reducers';

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
));

import App from './components/App';

import './index.css';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
