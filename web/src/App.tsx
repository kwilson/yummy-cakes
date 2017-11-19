import * as React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <header className="app__header">
          <h1>Yummy Cakes</h1>
        </header>

        <div className="app__body">
          <p>Body goes here</p>
        </div>

        <footer className="app__footer">Created by Kevin Wilson</footer>
      </div>
    );
  }
}

export default App;
