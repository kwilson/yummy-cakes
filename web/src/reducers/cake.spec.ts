import reducer, { CakesState } from './cake';
import * as actions from '../actions';

const defaultState: CakesState = {};

describe('Cake reducer', () => {
  it('returns the default state if there is no matching action', () => {
    // Arrange
    const state: CakesState = { ...defaultState };

    // Act
    const result = reducer(state, {
      type: 'no-op'
    });

    // Assert
    expect(result).toBe(state);
  });

  describe(actions.SELECT_CAKE, () => {
    it('sets selectedCakeId', () => {
      // Arrange
      const selectedCakeId = 'newSelectedId';
      const state: CakesState = { ...defaultState };

      // Act
      const result = reducer(state, {
        type: actions.SELECT_CAKE,
        payload: {
          id: selectedCakeId
        }
      });

      // Assert
      expect(result.selectedCakeId).toBe(selectedCakeId);
    });
  });

  describe(actions.CLEAR_SELECTED_CAKE, () => {
    it('clears selectedCakeId', () => {
      // Arrange
      const selectedCakeId = 'selectedId';
      const state: CakesState = {
        ...defaultState,
        selectedCakeId: selectedCakeId
      };

      // Act
      const result = reducer(state, {
        type: actions.CLEAR_SELECTED_CAKE
      });

      // Assert
      expect(result.selectedCakeId).not.toBeDefined();
    });
  });
});
