import React from 'react';

import { connect } from 'react-redux';

function WaveformButton (props) {

  const parseWaveform = (string) => {
    return string.split('').filter(char => {
      return isNaN(Number(char))
    }).join('')
  }

  return (
    <span
      className={parseWaveform(props.selectedWaveform) === props.type.toLowerCase() ? "waveform-button selected" : "waveform-button"}
      onClick={()=>props.changeWaveform(props.type.toLowerCase())}
      >
      <object data={props.svg} />
    </span>
  )

}

function mapStateToProps(state) {
  return {
    selectedWaveform: state.audioSettings.synths.oscillator.type
  }
}

export default connect(mapStateToProps)(WaveformButton)
