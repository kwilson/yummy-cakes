import * as React from 'react';
import { shallow } from 'enzyme';
import { create as createSnapshot } from 'react-test-renderer';

jest.mock('../selectors');
import { getAllCakesList, isCakesListLoading, getSelectedCake } from '../selectors';

jest.mock('../actions');
import { fetchCakesIfNeeded, selectCake, clearSelectedCake } from '../actions';

import { asMock } from '../__test-utils__';
import { CakeModel } from '../models/CakeModel';

import { App, mapStateToProps, mapDispatchToProps, AppDispatchProps } from './App';
import { AppState } from '../reducers';
import { CakeList, CakeDetail } from '../components';

describe('App Container', () => {
  describe('mapStateToProps', () => {
    it('maps values from selectors', () => {
      // Arrange
      const allCakes: CakeModel[] = [];
      const selectedCake: CakeModel = { id: 'id123' };
      const isLoading = true;

      const mockState = {} as AppState;

      asMock(getAllCakesList).mockReturnValue(allCakes);
      asMock(getSelectedCake).mockReturnValue(selectedCake);
      asMock(isCakesListLoading).mockReturnValue(isLoading);

      // Act
      const result = mapStateToProps(mockState, undefined);

      // Assert
      expect(getAllCakesList).toHaveBeenCalledWith(mockState);
      expect(getSelectedCake).toHaveBeenCalledWith(mockState);
      expect(isCakesListLoading).toHaveBeenCalledWith(mockState);

      expect(result.allCakes).toBe(allCakes);
      expect(result.selectedCake).toBe(selectedCake);
      expect(result.isLoading).toBe(isLoading);
    });
  });

  describe('mapDispatchToProps', () => {
    it('attaches to dispatch events', () => {
      // Arrange
      const mockDispatch = jest.fn();

      // Act
      // Need to cast to 'any' to get around issue with the
      // Typescript defs.
      // See: https://github.com/Microsoft/TypeScript/issues/14091
      const result: AppDispatchProps = (mapDispatchToProps as any)(mockDispatch);

      // Assert
      expect(result.dispatch).toBe(mockDispatch);

      // selectCake
      const selectCakeValue = {};
      asMock(selectCake).mockReturnValue(selectCakeValue);
      result.selectCake(expect.any(typeof Number));
      expect(mockDispatch).toHaveBeenCalledWith(selectCakeValue);

      // selectCake
      const clearSelectedCakeValue = {};
      asMock(clearSelectedCake).mockReturnValue(clearSelectedCakeValue);
      result.clearSelectedCake();
      expect(mockDispatch).toHaveBeenCalledWith(clearSelectedCakeValue);
    });
  });

  describe('App component', () => {
    const mockDispatch = jest.fn();
    const mockSelectCake = jest.fn();
    const mockClearSelectedCake = jest.fn();
    const mockSubmitCake = jest.fn();
    const mockCancelSubmitCake = jest.fn();
    const mockShowSubmitCakeForm = jest.fn();

    const allCakes: CakeModel[] = [];
    const isLoading = false;
    const selectedCake: CakeModel = { id: 'id123' };
    const isSubmitFormVisible = false;

    const fetchCakesIfNeededValue = {};

    afterEach(() => {
      mockDispatch.mockReset();
      mockSelectCake.mockReset();
      mockClearSelectedCake.mockReset();
      mockSubmitCake.mockReset();
      mockCancelSubmitCake.mockReset();
      mockShowSubmitCakeForm.mockReset();
    });

    it('dispatches fetchCakesIfNeeded on mount', () => {
      // Arrange
      asMock(fetchCakesIfNeeded).mockReturnValue(fetchCakesIfNeededValue);

      const cmp = (
        <App
          allCakes={allCakes}
          isSubmitFormVisible={isSubmitFormVisible}
          isLoading={isLoading}

          dispatch={mockDispatch}
          selectCake={mockSelectCake}
          clearSelectedCake={mockClearSelectedCake}
          submitCake={mockSubmitCake}
          cancelSubmitCake={mockCancelSubmitCake}
          showSubmitCakeForm={mockShowSubmitCakeForm}
        />
      );

      // Act
      shallow(cmp);
      const snapshot = createSnapshot(cmp).toJSON();

      // Assert
      expect(fetchCakesIfNeeded).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith(fetchCakesIfNeededValue);

      expect(snapshot).toMatchSnapshot();
    });

    it('passes props to child components', () => {
      // Arrange
      const cmp = (
        <App
          allCakes={allCakes}
          isSubmitFormVisible={isSubmitFormVisible}
          isLoading={isLoading}

          dispatch={mockDispatch}
          selectCake={mockSelectCake}
          clearSelectedCake={mockClearSelectedCake}
          submitCake={mockSubmitCake}
          cancelSubmitCake={mockCancelSubmitCake}
          showSubmitCakeForm={mockShowSubmitCakeForm}
        />
      );

      // Act
      const el = shallow(cmp);
      const snapshot = createSnapshot(cmp).toJSON();

      // Assert
      expect(el.find(CakeList).props().cakes).toBe(allCakes);
      el.find(CakeList).props().onSelectCake('test');
      expect(selectCake).toHaveBeenCalledWith('test');

      expect(el.find(CakeDetail).props().selectedCake).toBe(selectedCake);
      el.find(CakeDetail).props().close();
      expect(clearSelectedCake).toHaveBeenCalled();

      expect(snapshot).toMatchSnapshot();
    });
  });
});
