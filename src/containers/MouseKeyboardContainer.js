import React, { Component } from 'react';

import MouseControlContainer from './MouseControlContainer'
import KeyboardViewFrequencyDisplayContainer from './KeyboardViewFrequencyDisplayContainer'

export default class MouseKeyboardContainer extends Component {

  render(){
    return (
      <div id="mouse-keyboard-container">
        <MouseControlContainer
          circleControlProps={this.props.circleControlProps}
          chromaticControlProps={this.props.chromaticControlProps}
        />
        <KeyboardViewFrequencyDisplayContainer
          keyDowns={this.props.keyDowns}
          frequencyNoteDataProps={this.props.frequencyNoteDataProps}
        />
      </div>
    )
  }

}
