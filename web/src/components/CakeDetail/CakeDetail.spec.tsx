import * as React from 'react';
import { shallow } from 'enzyme';
import { create as createSnapshot } from 'react-test-renderer';

import CakeDetail from './CakeDetail';
import { CakeModel } from '../../models/CakeModel';

import { YumFactor } from '../';

describe('CakeDetail Component', () => {
  let closeHandler: jest.Mock<{}>;
  beforeEach(() => {
    closeHandler = jest.fn();
  });

  it('renders null if no cake is selected', () => {
    // Arrange
    const cmp = <CakeDetail close={closeHandler} />;

    // Act
    const el = shallow(cmp);
    const snapshot = createSnapshot(cmp).toJSON();

    // Assert
    expect(el.html()).toBe(null);
    expect(snapshot).toMatchSnapshot();
  });

  it('renders detals of the cake', () => {
    // Arrange
    const name = 'Name Value';
    const imageUrl = 'http://imageurl.invalid';
    const yumFactor = 4;
    const comment = 'Comment value';

    const cake: CakeModel = {
      id: 'ID123',
      name,
      imageUrl,
      yumFactor,
      comment
    };

    const cmp = <CakeDetail selectedCake={cake} close={closeHandler} />;

    // Act
    const el = shallow(cmp);
    const snapshot = createSnapshot(cmp).toJSON();

    expect(el.find('.cake-detail__img').props().src).toEqual(imageUrl);
    expect(el.find('.cake-detail__heading').text()).toEqual(name);
    expect(el.find('.cake-detail__comment-value').text()).toEqual(comment);

    expect(el.find(YumFactor).props().value).toEqual(yumFactor);

    expect(snapshot).toMatchSnapshot();
  });

  it('renders empty comment text if there are no comments', () => {
    // Arrange
    const name = 'Name Value';

    const cake: CakeModel = {
      id: 'ID123',
      name
    };

    const cmp = <CakeDetail selectedCake={cake} close={closeHandler} />;

    // Act
    const el = shallow(cmp);
    const snapshot = createSnapshot(cmp).toJSON();

    expect(el.find('.cake-detail__comment-value').text()).toEqual('No comments');

    expect(snapshot).toMatchSnapshot();
  });

  it('fires the close handler on button click', () => {
    // Arrange
    const name = 'Name Value';

    const cake: CakeModel = {
      id: 'ID123',
      name
    };

    const cmp = <CakeDetail selectedCake={cake} close={closeHandler} />;
    const el = shallow(cmp);

    // Act
    el.find('.cake-detail__close').simulate('click');

    // Assert
    expect(closeHandler).toHaveBeenCalledTimes(1);
  });
});
