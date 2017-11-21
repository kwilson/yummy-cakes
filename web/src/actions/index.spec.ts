import * as actions from './';

jest.mock('../reducers/rest');
jest.mock('../selectors');

import rest from '../reducers/rest';
import { isCakesListLoading } from '../selectors';
import { asMock } from '../__test-utils__';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Dispatch } from 'redux';
import { NewCakeModel } from '../models/NewCakeModel';
import { CANCEL_SUBMIT_CAKE } from './';

const createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
  describe('selectCake', () => {
    it('returns the expected action', () => {
      // Arrange
      const id = 'CAKE123';

      // Act
      const result = actions.selectCake(id);

      // Assert
      expect(result.type).toBe(actions.SELECT_CAKE);
      expect(result.payload.id).toBe(id);
    });
  });

  describe('clearSelectedCake', () => {
    it('returns the expected action', () => {
      // Act
      const result = actions.clearSelectedCake();

      // Assert
      expect(result.type).toBe(actions.CLEAR_SELECTED_CAKE);
    });
  });

  describe('fetchCakesIfNeeded', () => {
    it('returns nothing if loading has already started', async () => {
      // Arrange
      asMock(isCakesListLoading).mockReturnValue(true);

      const mockStore = createMockStore({});

      // Act
      await mockStore.dispatch(actions.fetchCakesIfNeeded());

      // Assert
      expect(mockStore.getActions()).toHaveLength(0);
    });

    it('returns fetch action if nothing is loading', async () => {
      // Arrange
      const fetchCakesAction = {
        type: 'MOCK_FETCH_CAKES'
      };

      asMock(isCakesListLoading).mockReturnValue(false);
      asMock(rest.actions.cakes).mockReturnValue((dispatch: Dispatch<any>) => dispatch(fetchCakesAction));

      const mockStore = createMockStore({});

      // Act
      await mockStore.dispatch(actions.fetchCakesIfNeeded());

      // Assert
      expect(mockStore.getActions()).toEqual([fetchCakesAction]);
    });
  });

  describe('showSubmitCakeForm', () => {
    it('returns the expected action', () => {
      // Act
      const result = actions.showSubmitCakeForm();

      // Assert
      expect(result.type).toBe(actions.SHOW_SUBMIT_CAKE);
    });
  });

  describe('submitCake', () => {
    it('submits a new cake to the API', async () => {
      // Arrange
      const newCake: NewCakeModel = {
        name: 'Cake Name',
        yumFactor: 4,
        comment: 'New comment',
        imageUrl: 'http://imageurl.invalid'
      };

      const fetchCakesAction = {
        type: 'MOCK_FETCH_CAKES'
      };

      const postNewCakeAction = {
        type: 'MOCK_POST_CAKE'
      };

      asMock(rest.actions.cake).mockReturnValue(
        (dispatch: Dispatch<any>) => Promise.resolve(dispatch(postNewCakeAction)
      ));
      
      asMock(rest.actions.cakes).mockReturnValue((dispatch: Dispatch<any>) => dispatch(fetchCakesAction));
      
      const mockStore = createMockStore({});

      // Act
      await mockStore.dispatch(actions.submitCake(newCake));

      // Assert
      expect(mockStore.getActions()).toContain(postNewCakeAction);
      expect(mockStore.getActions()).toContain(fetchCakesAction);

      expect(mockStore.getActions().map(x => x.type)).toContain(CANCEL_SUBMIT_CAKE);
    });
  });

  describe('cancelSubmitCake', () => {
    it('returns the expected action', () => {
      // Act
      const result = actions.cancelSubmitCake();

      // Assert
      expect(result.type).toBe(actions.CANCEL_SUBMIT_CAKE);
    });
  });
});
