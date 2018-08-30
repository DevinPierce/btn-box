import React, { Component } from 'react';

import MouseControlContainer from './MouseControlContainer'
import KeyboardViewContainer from './KeyboardViewContainer'

export default class MouseKeyboardContainer extends Component {

  render(){
    return (
      <div id="mouse-keyboard-container">
        <MouseControlContainer
          mouseControlProps={this.props.mouseControlProps}
        />
        <KeyboardViewContainer
          keyDowns={this.props.keyDowns}
        />
      </div>
    )
  }

}
