import { combineReducers } from 'redux';
import cake, { CakesState } from './cake';
import rest, { RestState } from './rest';

export interface AppState {
  cake: CakesState;
  restReducers: RestState;
}

const restReducers = combineReducers(rest.reducers);

const reducers = combineReducers({
  cake,
  restReducers
});

export default reducers;
