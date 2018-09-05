import React from 'react';

import Reverb from './effects/Reverb'
import Delay from './effects/Delay'
import Vibrato from './effects/Vibrato'
import Tremolo from './effects/Tremolo'

export default function Effects (props) {

  return (
    <div id="effects-controls" className="tone-effect-control">
      <Reverb {...props.reverbControls}/>
      <Delay {...props.delayControls}/>
      <Vibrato {...props.vibratoControls}/>
      <Tremolo {...props.tremoloControls}/>
    </div>
  )

}
