import * as React from 'react';
import SubmitCake from './SubmitCake';
import { shallow, mount } from 'enzyme';

describe('SubmitCake Component', () => {
  let submitCakeHandler: jest.Mock<{}>;
  let cancelHandler: jest.Mock<{}>;

  beforeEach(() => {
    submitCakeHandler = jest.fn();
    cancelHandler = jest.fn();
  });

  it('fires the cancel handler when the cancel button is clicked', () => {
    // Arrange
    const cmp = <SubmitCake submitCake={submitCakeHandler} cancel={cancelHandler} />;
    const el = shallow(cmp);

    // Act
    el.find('.submit-cake__btn--cancel').simulate('click');

    // Assert
    expect(cancelHandler).toHaveBeenCalled();
  });

  it('fires the submit handler when the submit button is clicked', () => {
    // Arrange
    const cmp = <SubmitCake submitCake={submitCakeHandler} cancel={cancelHandler} />;
    const el = mount(cmp);

    const name = 'name value';
    const imageUrl = 'imageUrl value';
    const comment = 'comment value';
    const yumFactor = 4;

    const setInputValue = (formName: string, value: any) => {
      // el.find(`input[name='${formName}']`).props().value = value;
      // el.find(`input[name='${formName}']`).props().onChange();
      el.find(`input[name='${formName}']`).simulate(
        'change', 
        { 
          target: {
            name: formName,
            value
          }
        }
      );
    };

    // Act
    setInputValue('name', name);
    setInputValue('imageUrl', imageUrl);
    setInputValue('comment', comment);
    setInputValue('yumFactor', yumFactor);
    
    el.find('.submit-cake__form').simulate('submit');

    // Assert
    expect(submitCakeHandler).toHaveBeenCalledWith(expect.objectContaining({
      name,
      imageUrl,
      comment,
      yumFactor
    }));
  });
});
