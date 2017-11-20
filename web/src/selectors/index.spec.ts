import * as selectors from './';
import { AppState } from '../reducers/index';
import { CakeModel } from '../models/CakeModel';

const defaultState: AppState = {
  cake: {},
  restReducers: {
    cakes: {
      loading: false,
      data: {}
    }
  }
};

describe('Selectors', () => {
  describe('isCakesListLoading', () => {
    it('returns FALSE if the rest state does not have the loading flag', () => {
      // Arrange
      const state: AppState = {
        ...defaultState
      };

      // Act
      const result = selectors.isCakesListLoading(state);

      // Assert
      expect(result).toBe(false);
    });

    it('returns TRUE if the rest state has the loading flag', () => {
      // Arrange
      const state: AppState = {
        ...defaultState,
        restReducers: {
          cakes: {
            loading: true,
            data: {}
          }
        }
      };

      // Act
      const result = selectors.isCakesListLoading(state);

      // Assert
      expect(result).toBe(true);
    });
  });

  describe('getAllCakesList', () => {
    it('returns an empty array if there are no items', () => {
      // Arrange
      const state: AppState = {
        ...defaultState
      };

      // Act
      const result = selectors.getAllCakesList(state);

      // Assert
      expect(result).toBeDefined();
      expect(result).toHaveLength(0);
    });

    it('returns the items from the rest state', () => {
      // Arrange
      const cakes: CakeModel[] = [{ id: 'id123' }, { id: 'id456' }];
      const state: AppState = {
        ...defaultState,
        restReducers: {
          cakes: {
            loading: true,
            data: {
              data: cakes
            }
          }
        }
      };

      // Act
      const result = selectors.getAllCakesList(state);

      // Assert
      expect(result).toBe(cakes);
    });
  });

  describe('getSelectedCake', () => {
    const idToMatch = 'id456';
    const cakes: CakeModel[] = [{ id: 'id123' }, { id: idToMatch }];

    it('returns undefined if there is no selected cake', () => {
      const state: AppState = {
        ...defaultState
      };

      // Act
      const result = selectors.getSelectedCake(state);

      // Assert
      expect(result).not.toBeDefined();
    });

    it('returns undefined if there are no cakes', () => {
      const state: AppState = {
        ...defaultState,
        cake: {
          selectedCakeId: idToMatch
        }
      };

      // Act
      const result = selectors.getSelectedCake(state);

      // Assert
      expect(result).not.toBeDefined();
    });

    it('returns undefined if there are no matching cakes', () => {
      const state: AppState = {
        ...defaultState,
        cake: {
          selectedCakeId: 'will not match'
        },
        restReducers: {
          cakes: {
            loading: true,
            data: {
              data: cakes
            }
          }
        }
      };

      // Act
      const result = selectors.getSelectedCake(state);

      // Assert
      expect(result).not.toBeDefined();
    });

    it('returns undefined if there are no matching cakes', () => {
      const state: AppState = {
        ...defaultState,
        cake: {
          selectedCakeId: idToMatch
        },
        restReducers: {
          cakes: {
            loading: true,
            data: {
              data: cakes
            }
          }
        }
      };

      // Act
      const result = selectors.getSelectedCake(state);

      // Assert
      expect(result).toBe(cakes[1]);
    });
  });
});
