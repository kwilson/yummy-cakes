import { ThunkAction } from 'redux-thunk';
import rest from '../reducers/rest';

const fetchCakes = (): ThunkAction<void, void, void> => dispatch => {
  return dispatch(rest.actions.cakes());
};

const shouldFetchCakes = () => {
  return true;
};

export const selectCake = (id: string) => {
  console.log('select', id);
  return {
    type: 'SELECT_CAKE',
    payload: {
      id
    }
  };
};

export const fetchCakesIfNeeded = (): ThunkAction<void, void, void> => dispatch => {
  if (shouldFetchCakes()) {
    return dispatch(fetchCakes());
  }
};
