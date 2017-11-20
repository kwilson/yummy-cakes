import * as React from 'react';
import { connect, Dispatch, MapStateToProps, MapDispatchToProps } from 'react-redux';
import './App.css';

import { fetchCakesIfNeeded, selectCake, clearSelectedCake } from '../actions';
import { AppState } from '../reducers';
import { getAllCakesList, isCakesListLoading, getSelectedCake } from '../selectors';

import { CakeList, CakeDetail } from '../components/';

import { CakeModel } from '../models/CakeModel';

export interface AppStateProps {
  allCakes: CakeModel[];
  selectedCake?: CakeModel;
  isLoading: boolean;
}

export interface AppDispatchProps {
  dispatch: Dispatch<{}>;
  selectCake: (id: string) => any;
  clearSelectedCake: () => any;
}

export const mapStateToProps: MapStateToProps<AppStateProps, void, AppState> = (state) => {
  return {
    allCakes: getAllCakesList(state),
    selectedCake: getSelectedCake(state),

    isLoading: isCakesListLoading(state)
  };
};

export const mapDispatchToProps: MapDispatchToProps<AppDispatchProps, void> = dispatch => {
  return {
    dispatch,
    selectCake: (id: string) => dispatch(selectCake(id)),
    clearSelectedCake: () => dispatch(clearSelectedCake())
  };
};

export class App extends React.Component<AppStateProps & AppDispatchProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCakesIfNeeded());
  }

  render() {
    const onSelectCake = (id: string) => this.props.selectCake(id);

    return (
      <div className="app">
        <header className="app__header">
          <h1>Yummy Cakes</h1>
        </header>

        <div className="app__body">
          <CakeList
            cakes={this.props.allCakes}
            onSelectCake={onSelectCake}
          />
          <CakeDetail
            selectedCake={this.props.selectedCake}
            close={this.props.clearSelectedCake}
          />
        </div>

        <footer className="app__footer">Created by Kevin Wilson</footer>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
