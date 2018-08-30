import React, { Component } from 'react';

import MouseControlToggle from '../components/toneeffects/MouseControlToggle'
import Tone from '../components/toneeffects/Tone'
import Envelopes from '../components/toneeffects/Envelopes'
import Effects from '../components/toneeffects/Effects'

export default class ToneEffectsBarContainer extends Component {

  render(){
    return (
      <div id="tone-effects-bar">
        <MouseControlToggle />
        <Tone />
        <Envelopes />
        <Effects />
      </div>
    )
  }

}
