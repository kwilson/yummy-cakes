import { ThunkAction } from 'redux-thunk';
import rest from '../reducers/rest';
import { isCakesListLoading } from '../selectors';
import { AppState } from '../reducers';
import { NewCakeModel } from '../models/NewCakeModel';

export const SELECT_CAKE = 'SELECT_CAKE';
export const CLEAR_SELECTED_CAKE = 'CLEAR_SELECTED_CAKE';

export const SHOW_SUBMIT_CAKE = 'SHOW_SUBMIT_CAKE';
export const CANCEL_SUBMIT_CAKE = 'CANCEL_SUBMIT_CAKE';

const fetchCakes = (): ThunkAction<void, AppState, void> => dispatch => {
  return dispatch(rest.actions.cakes());
};

const shouldFetchCakes = (state: AppState) => {
  return !isCakesListLoading(state);
};

export const selectCake = (id: string) => ({
  type: SELECT_CAKE,
  payload: {
    id
  }
});

export const clearSelectedCake = () => ({
  type: CLEAR_SELECTED_CAKE
});

export const fetchCakesIfNeeded = (): ThunkAction<void, AppState, void> => (dispatch, getState) => {
  if (shouldFetchCakes(getState())) {
    return dispatch(fetchCakes());
  }
};

export const showSubmitCakeForm = () => ({
  type: SHOW_SUBMIT_CAKE
});

export const submitCake = (cake: NewCakeModel): ThunkAction<void, AppState, void> => (dispatch, getState) => {
  dispatch(
    rest.actions.cake(
      undefined, {
        body: JSON.stringify(cake)
      }
    ))
    .then(() => {
      dispatch(cancelSubmitCake());
      dispatch(fetchCakes());
    });
};

export const cancelSubmitCake = () => ({
  type: CANCEL_SUBMIT_CAKE
});
