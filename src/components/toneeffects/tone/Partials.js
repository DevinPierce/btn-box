import React from 'react';

import { connect } from 'react-redux';

function Partials (props) {

  const handleChange = (event) => {
    props.changePartials(event.target.value)
  }

  const parsePartials = (string) => {
    return Number(string.split('').filter(char => {
      return !isNaN(Number(char))
    }).join(''))
  }

  return (
    <div id="partial-controls" className="tone-control">
      <label htmlFor="partials" className="slider-label" >Partials</label>
      <div id="partial-slider-container">
        <span className="slider-value">1</span>
        <input
          type="range"
          name="partials"
          id="partial-slider"
          className="slider"
          min="1"
          max="32"
          onChange={handleChange}
          value={parsePartials(props.selectedWaveform)}
        />
        <span className="slider-value">32</span>
        <div className="slider-display">{parsePartials(props.selectedWaveform)}</div>
      </div>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    selectedWaveform: state.audioSettings.synths.oscillator.type
  }
}

export default connect(mapStateToProps)(Partials)
