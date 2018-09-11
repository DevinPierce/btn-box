import React, { Component } from 'react';
import MetaControls from '../components/toneeffects/MetaControls'
import Tone from '../components/toneeffects/Tone'
import Effects from '../components/toneeffects/Effects'

export default class ToneEffectsBarContainer extends Component {

  render(){

    return (
      <div id="tone-effects-bar">
        <MetaControls
          changeMasterVolume={this.props.toneEffectsProps.changeMasterVolume}
         />
        <Tone
          toneControls={this.props.toneEffectsProps.toneControls}
        />
        <Effects
          reverbControls={this.props.toneEffectsProps.reverbControls}
          delayControls={this.props.toneEffectsProps.delayControls}
          vibratoControls={this.props.toneEffectsProps.vibratoControls}
          tremoloControls={this.props.toneEffectsProps.tremoloControls}
        />
      </div>
    )
  }

}
