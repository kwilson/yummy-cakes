import { combineReducers } from 'redux';
import rest from './rest';

const restReducers = combineReducers(rest.reducers);

const reducers = combineReducers({
  restReducers
});

export default reducers;
