import React from 'react';

export default function Waveform (props) {

  return (
    <div id="waveform-controls" className="tone-control">
      <button onClick={()=>props.changeWaveform('sine')}>ANOTHER TEMPORARY BUTTON HERE! SINE</button>
      <button onClick={()=>props.changeWaveform('square4')}>ANOTHER TEMPORARY BUTTON HERE! SQUARE</button>
      <button onClick={()=>props.changeWaveform('triangle')}>ANOTHER TEMPORARY BUTTON HERE! TRIANGLE</button>
      <button onClick={()=>props.changeWaveform('sawtooth4')}>ANOTHER TEMPORARY BUTTON HERE! SAWTOOTH</button>
    </div>
  )

}
