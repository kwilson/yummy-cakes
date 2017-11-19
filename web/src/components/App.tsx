import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import './App.css';

import AllCakesList from '../containers/AllCakesList';
import { fetchCakesIfNeeded } from '../actions';
import { Cake } from '../models/Cake';

export interface AppState {
  restReducers: {
    cakes: {
      loading: boolean;
      data: {
        data?: Cake[]
      }
    }
  };
}

class App extends React.Component<{ dispatch: Dispatch<AppState> }> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCakesIfNeeded());
  }

  render() {
    return (
      <div className="app">
        <header className="app__header">
          <h1>Yummy Cakes</h1>
        </header>

        <div className="app__body">
          <AllCakesList />
        </div>

        <footer className="app__footer">Created by Kevin Wilson</footer>
      </div>
    );
  }
}

export default connect()(App);
