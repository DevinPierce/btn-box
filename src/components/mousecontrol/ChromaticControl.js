import React from 'react';

import { connect } from 'react-redux';

import chromaticBackground from '../../svg/chromatic_background.svg'

function ChromaticControl (props) {

  const elementHeight = 500

  const handleMouseMove = (event) => {
    // const scaledX = (event.nativeEvent.offsetX / 700) - 1
    // props.chromaticControlProps.changeXValue(scaledX)
    // IDEA: x-axis should control "chord volume," icreasing volume up the triad as you go right
    let invertedY = (elementHeight - event.nativeEvent.offsetY)
    // IDEA: get Y value to scale logarithmically I think?

    const minV = Math.log(65)
    const maxV = Math.log(265)
    const scale = (maxV - minV) / (500 - 0)

    function positionToValue(invertedY) {
      return Math.exp(minV + scale * (invertedY - 0));
    }

    function valueToPosition(value) {
      return (Math.log(value) - minV) / scale + 0;
    }

    const value = positionToValue(Number(invertedY));
    props.chromaticControlProps.changeYValue(value);

    // props.chromaticControlProps.changeYValue(((invertedY + 162) * 0.40))
    // props.chromaticControlProps.changeYValue(((Math.log(500/0.1)/199+0.1) * invertedY* 1.1))

    // NOTE: ~65, or C2. scales up to about 264Hz, just slightly over C4
    // IDEA: Y value passed here is pretty arbitrary; I guess it depends on what I decide to make the range, and what information the mouse input element displays later
  }
  const handleMouseOver = () => {
    props.chromaticControlProps.toneStart()
  }
  const handleMouseOut = () => {
    props.chromaticControlProps.toneStop()
  }

  return (
      <div
        id="chromatic-control-field"
        className={props.interfaceMode.chromaticControl ? "show" : "hidden"}
        onMouseMove={event=>handleMouseMove(event)}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <object
          data={chromaticBackground}
          >
          </object>
      </div>
  )

}

function mapStateToProps(state) {
  return {
    interfaceMode: state.interfaceMode
  }
}

export default connect(mapStateToProps)(ChromaticControl)
