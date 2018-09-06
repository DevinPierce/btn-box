import React from 'react';

import { connect } from 'react-redux';

function WaveformButton (props) {

  return (
    <span
      className={props.selectedWaveform === props.type.toLowerCase() ? "waveform-button selected" : "waveform-button"}
      onClick={()=>props.changeWaveform(props.type.toLowerCase())}
      >{props.type}
    </span>
  )

}

function mapStateToProps(state) {
  return {
    selectedWaveform: state.audioSettings.synths.oscillator.type
  }
}

export default connect(mapStateToProps)(WaveformButton)
