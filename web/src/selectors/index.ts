import { createSelector } from 'reselect';
import { AppState } from '../reducers';

const cakesEndpoint = (state: AppState) => state.restReducers.cakes;
const selectedCakeId = (state: AppState) => state.cake.selectedCakeId;

export const isCakesListLoading = createSelector(
  [cakesEndpoint],
  (cakes) => cakes.loading
);

export const getAllCakesList = createSelector(
  [cakesEndpoint],
  (cakes) => cakes.data.data || []
);

export const getSelectedCake = createSelector(
  [getAllCakesList, selectedCakeId],
  (cakes, selectedId) => {
    return cakes.find(x => x.id === selectedId);
  }
);
