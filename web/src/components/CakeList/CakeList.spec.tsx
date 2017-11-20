import * as React from 'react';
import { shallow } from 'enzyme';
import { create as createSnapshot } from 'react-test-renderer';

import CakeList from './CakeList';
import { CakeModel } from '../../models/CakeModel';

import { Cake } from '../';

describe('CakeList Component', () => {
  let onSelectCakeHandler: jest.Mock<{}>;
  beforeEach(() => {
    onSelectCakeHandler = jest.fn();
  });

  it('displays placeholder text if there are no cakes', () => {
    // Arrange
    const cakes: CakeModel[] = [];

    const cmp = <CakeList cakes={cakes} onSelectCake={onSelectCakeHandler} />;

    // Act
    const el = shallow(cmp);
    const snapshot = createSnapshot(cmp).toJSON();

    // Assert
    expect(el.find('.cake-list')).toHaveLength(0);

    expect(el.find('.cake-list--empty').text()).toEqual('No cakes to view');
    expect(snapshot).toMatchSnapshot();
  });

  it('retuns a child component for each cake', () => {
    // Arrange
    const cakes: CakeModel[] = [1, 2, 3, 4, 5].map(value => ({
      id: `cake-${value}`,
      name: `Cake Name ${value}`
    }));

    const cmp = <CakeList cakes={cakes} onSelectCake={onSelectCakeHandler} />;

    // Act
    const el = shallow(cmp);
    const snapshot = createSnapshot(cmp).toJSON();

    // Assert
    const cakeComponents = el.find(Cake);
    expect(cakeComponents).toHaveLength(cakes.length);

    cakeComponents.forEach((cakeComponent, idx) => {
      expect(cakeComponent.props().cake).toBe(cakes[idx]);

      cakeComponent.props().selectCake();
      expect(onSelectCakeHandler).toHaveBeenCalledTimes(1);
      expect(onSelectCakeHandler).toHaveBeenCalledWith(cakes[idx].id);

      jest.resetAllMocks();
    });

    expect(snapshot).toMatchSnapshot();
  });
});
