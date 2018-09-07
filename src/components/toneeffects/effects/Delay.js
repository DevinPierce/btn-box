import React from 'react';

import { connect } from 'react-redux';

function Delay (props) {

  const handleChange = (event) => {
    switch (event.target.dataset.control){
      case "delayTime":
        props.delayTime(event.target.value / 100)
        break;
      case "feedback":
        props.feedback(event.target.value / 100)
        break;
      case "wet":
        props.wet(event.target.value / 100)
        break;
      default:
    }
  }

  return (
    <span id="delay-controller" className="effect-control">
      <div className="effect-label">Delay</div>
      <label htmlFor="delaytime" className="slider-label">Delay Time</label>
      <input
        type="range"
        name="delaytime"
        className="slider"
        onChange={handleChange}
        data-control="delayTime"
        value={props.delay.delayTime * 100}
      />
      <label htmlFor="feedback" className="slider-label">Feedback</label>
      <input
        type="range"
        name="feedback"
        className="slider"
        onChange={handleChange}
        data-control="feedback"
        value={props.delay.feedback * 100}
      />
      <label htmlFor="wet" className="slider-label">Dry/Wet</label>
      <input
        type="range"
        name="wet"
        className="slider"
        onChange={handleChange}
        data-control="wet"
        min='1'
        max='50'
        value={props.delay.wet * 100}
      />
    </span>
  )

}

function mapStateToProps(state) {
  return {
    delay: state.audioSettings.delay
  }
}

export default connect(mapStateToProps)(Delay)
