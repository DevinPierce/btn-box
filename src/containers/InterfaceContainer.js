import React, { Component } from 'react';

// import MouseControlContainer from './MouseControlContainer'
import ToneEffectsBarContainer from './ToneEffectsBarContainer'
import MouseKeyboardContainer from './MouseKeyboardContainer'
// import KeyboardViewFrequencyDisplayContainer from './KeyboardViewFrequencyDisplayContainer'

export default class InterfaceContainer extends Component {

  render(){
    return (
      <div id="interface-container">
        <ToneEffectsBarContainer
          toneEffectsProps={this.props.toneEffectsProps}
        />
        <MouseKeyboardContainer
          circleControlProps={this.props.circleControlProps}
          chromaticControlProps={this.props.chromaticControlProps}
          keyDowns={this.props.keyDowns}
          frequencyNoteDataProps={this.props.frequencyNoteDataProps}
        />
      </div>
    )
  }

}
