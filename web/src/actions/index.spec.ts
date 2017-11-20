import * as actions from './';

jest.mock('../reducers/rest');
jest.mock('../selectors');

import rest from '../reducers/rest';
import { isCakesListLoading } from '../selectors';
import { asMock } from '../__test-utils__';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Dispatch } from 'redux';

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
        type: 'MOCK_FETCH+CAKES'
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
});
