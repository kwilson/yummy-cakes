import * as React from 'react';
import { mount } from 'enzyme';
import { create as createSnapshot } from 'react-test-renderer';

import YumFactor from './YumFactor';

describe('YumFactor component', () => {
  it('renders null if there is no value', () => {
    // Arrange
    const cmp = <YumFactor />;

    // Act
    const el = mount(cmp);
    const snapshot = createSnapshot(cmp).toJSON();

    // Assert
    expect(el.html()).toBe(null);
    expect(snapshot).toMatchSnapshot();
  });

  it('renders null if the value is 0', () => {
    // Arrange
    const cmp = <YumFactor value={0} />;

    // Act
    const el = mount(cmp);
    const snapshot = createSnapshot(cmp).toJSON();

    // Assert
    expect(el.html()).toBe(null);
    expect(snapshot).toMatchSnapshot();
  });

  it('renders null if the value is 6', () => {
    // Arrange
    const cmp = <YumFactor value={6} />;

    // Act
    const el = mount(cmp);
    const snapshot = createSnapshot(cmp).toJSON();

    // Assert
    expect(el.html()).toBe(null);
    expect(snapshot).toMatchSnapshot();
  });

  it('renders the correct stars for each value', () => {
    // Arrange
    const testCases = [
      { value: 1, expected: '★☆☆☆☆' },
      { value: 2, expected: '★★☆☆☆' },
      { value: 3, expected: '★★★☆☆' },
      { value: 4, expected: '★★★★☆' },
      { value: 5, expected: '★★★★★' }
    ];

    testCases.forEach(testCase => {
      // Arrange
      const cmp = <YumFactor value={testCase.value} />;

      // Act
      const el = mount(cmp);
      const snapshot = createSnapshot(cmp).toJSON();

      // Assert
      const rating = el.find('.yum-factor__rating');
      expect(rating.text().length).toBe(5);
      expect(rating.props().title).toBe(`${testCase.value} out of 5`);

      expect(rating.text()).toBe(testCase.expected);

      expect(snapshot).toMatchSnapshot();
    });
  });
});
