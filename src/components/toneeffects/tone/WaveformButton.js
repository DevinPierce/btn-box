import React from 'react';

export default function WaveformButton (props) {

  return (
    <span
      className="waveform-button"
      onClick={()=>props.changeWaveform(props.type.toLowerCase())}
      >{props.type}
    </span>

  )

}
