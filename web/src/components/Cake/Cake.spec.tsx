import * as React from 'react';
import { mount } from 'enzyme';
import { create as createSnapshot } from 'react-test-renderer';

import Cake from './Cake';
import { CakeModel } from '../../models/CakeModel';

describe('Cake Component', () => {
  let selectCakeHandler: jest.Mock<{}>;

  beforeEach(() => {
    selectCakeHandler = jest.fn();
  });

  it('renders an empty container if the model has no name', () => {
    // Arrange
    const cake: CakeModel = {
      id: 'ID123'
    };

    const cmp = <Cake cake={cake} selectCake={selectCakeHandler} />;

    // Act
    const el = mount(cmp);
    const snapshot = createSnapshot(cmp).toJSON();

    // Assert
    const details = el.find('.cake__details');
    expect(details).toHaveLength(0);

    expect(snapshot).toMatchSnapshot();
  });

  it('renders the name from the model', () => {
    // Arrange
    const cakeName = 'Name of the cake';
    const cake: CakeModel = {
      id: 'ID123',
      name: cakeName
    };

    const cmp = <Cake cake={cake} selectCake={selectCakeHandler} />;

    // Act
    const el = mount(cmp);
    const snapshot = createSnapshot(cmp).toJSON();

    // Assert
    const details = el.find('.cake__details');
    expect(details).toHaveLength(1);

    expect(details.text()).toEqual(cakeName);

    expect(snapshot).toMatchSnapshot();
  });

  it('triggers the select cake handler when the button is clicked', () => {
    // Arrange
    const cake: CakeModel = {
      id: 'ID123'
    };

    const cmp = <Cake cake={cake} selectCake={selectCakeHandler} />;

    // Act
    const el = mount(cmp);
    el.simulate('click');

    // Assert
    expect(selectCakeHandler).toHaveBeenCalledTimes(1);
  });
});
