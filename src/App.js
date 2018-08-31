import React, { Component } from 'react';
import './App.css';

import AudioController from './containers/AudioController'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AudioController />
      </div>
    );
  }
}

export default App;
