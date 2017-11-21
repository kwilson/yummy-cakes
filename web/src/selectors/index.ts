import { createSelector } from 'reselect';
import { AppState } from '../reducers';

const cakesEndpoint = (state: AppState) => state.restReducers.cakes;
const cakeState = (state: AppState) => state.cake;

export const isCakesListLoading = createSelector(
  [cakesEndpoint],
  (cakes) => cakes.loading
);

export const getAllCakesList = createSelector(
  [cakesEndpoint],
  (cakes) => cakes.data.data || []
);

export const getSelectedCake = createSelector(
  [getAllCakesList, cakeState],
  (cakes, state) => {
    return cakes.find(x => x.id === state.selectedCakeId);
  }
);

export const isSubmitFormVisible = createSelector(
  [cakeState],
  (state) => state.isSubmitFormVisible === true
);
