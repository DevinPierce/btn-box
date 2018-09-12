import React from 'react';

import WaveformButton from './WaveformButton'

import sine from '../../../svg/80x80_sine.svg'
import tri from '../../../svg/80x80_tri.svg'
import sqr from '../../../svg/80x80_sqr.svg'
import saw from '../../../svg/80x80_saw.svg'

export default function Waveform (props) {

  const waveforms = [
    'Sine',
    'Triangle',
    'Square',
    'Sawtooth',
  ]

  const svgs = [
    sine,
    tri,
    sqr,
    saw
  ]

  const renderButtons = () => {
    return waveforms.map((waveform, index) => {
      return <WaveformButton
        key={waveform}
        type={waveform}
        changeWaveform={props.changeWaveform}
        svg={svgs[index]}
      />
    })
  }

  return (
    <div id="waveform-controls" className="tone-control">
      {renderButtons()}
    </div>
  )

}
