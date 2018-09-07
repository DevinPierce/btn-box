import React, { Component } from 'react';

import KeyboardView from '../components/keyboardview/KeyboardView'
import FrequencyNoteDisplay from '../components/frequencynotedisplay/FrequencyNoteDisplay'

export default class KeyboardViewFrequencyDisplayContainer extends Component {

  render(){
    return (
      <div id="keyboard-view-frequency-display-container">
        <KeyboardView
          {...this.props}
        />
        <FrequencyNoteDisplay
          {...this.props.frequencyNoteDataProps}
        />
      </div>
    )
  }

}
