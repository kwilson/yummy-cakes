import * as React from 'react';
import { connect, Dispatch, MapStateToProps, MapDispatchToProps } from 'react-redux';
import './App.css';

import { fetchCakesIfNeeded, selectCake, clearSelectedCake, submitCake, cancelSubmitCake, showSubmitCakeForm } from '../actions';
import { AppState } from '../reducers';
import { getAllCakesList, isCakesListLoading, getSelectedCake, isSubmitFormVisible } from '../selectors';

import { CakeList, CakeDetail, SubmitCake } from '../components/';

import { CakeModel } from '../models/CakeModel';
import { NewCakeModel } from '../models/NewCakeModel';

export interface AppStateProps {
  allCakes: CakeModel[];
  selectedCake?: CakeModel;
  isSubmitFormVisible: boolean;
  isLoading: boolean;
}

export interface AppDispatchProps {
  dispatch: Dispatch<{}>;
  selectCake: (id: string) => any;
  clearSelectedCake: () => any;

  showSubmitCakeForm: () => any;
  submitCake: (cake: NewCakeModel) => any;
  cancelSubmitCake: () => any;
}

export const mapStateToProps: MapStateToProps<AppStateProps, void, AppState> = (state) => {
  return {
    allCakes: getAllCakesList(state),
    selectedCake: getSelectedCake(state),
    isSubmitFormVisible: isSubmitFormVisible(state),

    isLoading: isCakesListLoading(state)
  };
};

export const mapDispatchToProps: MapDispatchToProps<AppDispatchProps, void> = dispatch => {
  return {
    dispatch,
    selectCake: (id: string) => dispatch(selectCake(id)),
    clearSelectedCake: () => dispatch(clearSelectedCake()),

    showSubmitCakeForm: () => dispatch(showSubmitCakeForm()),
    submitCake: (cake: CakeModel) => dispatch(submitCake(cake)),
    cancelSubmitCake: () => dispatch(cancelSubmitCake())
  };
};

export class App extends React.Component<AppStateProps & AppDispatchProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCakesIfNeeded());
  }

  render() {
    const onSelectCake = (id: string) => this.props.selectCake(id);
    const handleShowSubmitCakeForm = () => this.props.showSubmitCakeForm();

    return (
      <div className="app">
        <header className="app__header">
          <h1>Yummy Cakes</h1>
          <button className="btn-show-submit-form" onClick={handleShowSubmitCakeForm}>Submit A Cake</button>
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

          {this.props.isSubmitFormVisible &&
            <SubmitCake
              submitCake={this.props.submitCake}
              cancel={this.props.cancelSubmitCake}
            />
          }
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
