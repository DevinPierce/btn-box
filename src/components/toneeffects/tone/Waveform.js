import React from 'react';

import WaveformButton from './WaveformButton'

export default function Waveform (props) {

  const waveforms = [
    'Sine',
    'Triangle',
    'Square',
    'Sawtooth',
  ]

  const renderButtons = () => {
    return waveforms.map(waveform => {
      return <WaveformButton
        key={waveform}
        type={waveform}
        changeWaveform={props.changeWaveform}
      />
    })
  }

  return (
    <div id="waveform-controls" className="tone-control">
      {renderButtons()}
    </div>
  )

}
