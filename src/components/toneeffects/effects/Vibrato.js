import React from 'react';

import { connect } from 'react-redux';

function Vibrato (props) {

  const handleChange = (event) => {
    switch (event.target.dataset.control){
      case "frequency":
        props.frequency(event.target.value / 10)
        break;
      case "depth":
        props.depth(event.target.value / 100)
        break;
      default:
    }
  }

  return (
    <span id="vibrato-controller" className="effect-control">
      <div className="effect-label">Vibrato</div>
      <label htmlFor="frequency" className="slider-label">Frequency</label>
      <input
        type="range"
        name="frequency"
        className="slider"
        onChange={handleChange}
        data-control="frequency"
        value={props.vibrato.frequency * 10}
      />
      <label htmlFor="depth" className="slider-label">Depth</label>
      <input
        type="range"
        name="depth"
        className="slider"
        onChange={handleChange}
        data-control="depth"
        value={props.vibrato.depth * 100}
      />
    </span>
  )

}

function mapStateToProps(state) {
  return {
    vibrato: state.audioSettings.vibrato
  }
}

export default connect(mapStateToProps)(Vibrato)
