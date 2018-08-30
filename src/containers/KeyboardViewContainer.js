import React, { Component } from 'react';

import KeyboardView from '../components/keyboardview/KeyboardView'

export default class KeyboardViewContainer extends Component {

  render(){
    return (
      <div id="keyboard-view-container">
        <KeyboardView
          {...this.props}
        />
      </div>
    )
  }

}
