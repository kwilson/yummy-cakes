import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import CakeList, { CakeListStateProps, CakeListDispatchProps } from '../components/CakeList';
import { AppState } from '../components/App';

import { selectCake } from '../actions';

const mapStateToProps: MapStateToProps<CakeListStateProps, void, AppState> = (state) => {
  return {
    cakes: state.restReducers.cakes.data.data || [],
    isLoading: state.restReducers.cakes.loading
  };
};

const mapDispatchToProps: MapDispatchToProps<CakeListDispatchProps, void> = dispatch => {
  return {
    selectCake: (id: string) => dispatch(selectCake(id))
  };
};

const AllCakesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CakeList);

export default AllCakesList;
