import React from 'react';

import Waveform from './tone/Waveform'
import Filter from './tone/Filter'

export default function Tone (props) {

  return (
    <div id="tone-controls" className="tone-effect-control">
      <Waveform
        changeWaveform={props.toneControls.changeWaveform}
       />
      <Filter
        filterType={props.toneControls.filterType}
        filterFrequency={props.toneControls.filterFrequency}
        filterResonance={props.toneControls.filterResonance}
      />
    </div>
  )

}
