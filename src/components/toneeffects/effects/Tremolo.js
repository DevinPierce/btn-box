import React from 'react';

import { connect } from 'react-redux';

function Tremolo (props) {

  const handleChange = (event) => {
    switch (event.target.dataset.control){
      case "frequency":
        props.frequency(event.target.value / 10)
        break;
      case "depth":
        props.depth(event.target.value / 100)
        break;
      case "spread":
        props.spread(event.target.value)
        break;
      case "wet":
        props.wet(event.target.value / 100)
        break;
      default:
    }
  }

  return (
    <span id="tremolo-controller" className="effect-control">
      <div className="effect-label">Tremolo</div>
      <label htmlFor="frequency" className="slider-label">Frequency</label>
      <input
        type="range"
        name="frequency"
        className="slider"
        onChange={handleChange}
        data-control="frequency"
        value={props.tremolo.frequency * 10}
      />
      <label htmlFor="depth" className="slider-label">Depth</label>
      <input
        type="range"
        name="depth"
        className="slider"
        onChange={handleChange}
        data-control="depth"
        value={props.tremolo.depth * 100}
      />
      <label htmlFor="spread" className="slider-label">Spread</label>
      <input
        type="range"
        name="spread"
        className="slider"
        onChange={handleChange}
        data-control="spread"
        min="0"
        max="360"
        value={props.tremolo.spread}
      />
      <label htmlFor="wet" className="slider-label">Dry/Wet</label>
      <input
        type="range"
        name="wet"
        className="slider"
        onChange={handleChange}
        data-control="wet"
        value={props.tremolo.wet * 100}
      />
    </span>
  )

}

function mapStateToProps(state) {
  return {
    tremolo: state.audioSettings.tremolo
  }
}

export default connect(mapStateToProps)(Tremolo)
