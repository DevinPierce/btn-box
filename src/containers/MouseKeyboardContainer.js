import React, { Component } from 'react';

import MouseControlContainer from './MouseControlContainer'
import KeyboardViewFrequencyDisplayContainer from './KeyboardViewFrequencyDisplayContainer'

export default class MouseKeyboardContainer extends Component {

  render(){
    return (
      <div id="mouse-keyboard-container">
        <MouseControlContainer
          visualizerProps={this.props.visualizerProps}
          circleControlProps={this.props.circleControlProps}
          chromaticControlProps={this.props.chromaticControlProps}
        />
        <KeyboardViewFrequencyDisplayContainer
          frequencyNoteDataProps={this.props.frequencyNoteDataProps}
        />
      </div>
    )
  }

}
