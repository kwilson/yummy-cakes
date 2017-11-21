import * as actions from '../actions';
import { AnyAction } from 'redux';

export interface CakesState {
  selectedCakeId?: string;
  isSubmitFormVisible?: boolean;
}

const cakeReducer = (state: CakesState = {}, action: AnyAction) => {
  switch (action.type) {
    case actions.SELECT_CAKE: {
      const id = action.payload.id;
      return {
        ...state,
        selectedCakeId: id
      };
    }

    case actions.CLEAR_SELECTED_CAKE: {
      return {
        ...state,
        selectedCakeId: undefined
      };
    }

    case actions.SHOW_SUBMIT_CAKE: {
      return {
        ...state,
        isSubmitFormVisible: true
      };
    }

    case actions.CANCEL_SUBMIT_CAKE: {
      return {
        ...state,
        isSubmitFormVisible: false
      };
    }

    default:
      return state;
  }
};

export default cakeReducer;
