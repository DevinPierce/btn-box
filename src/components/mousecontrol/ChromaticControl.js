import React from 'react';

import { connect } from 'react-redux';

import chromaticBackground from '../../svg/chromatic_background.svg'

function ChromaticControl (props) {

  const elementHeight = 500

  const handleMouseMove = (event) => {
    // const scaledX = (event.nativeEvent.offsetX / 700) - 1
    // props.chromaticControlProps.changeXValue(scaledX)
    // IDEA: x-axis should control "chord volume," icreasing volume up the triad as you go right
    const invertedY = (elementHeight - event.nativeEvent.offsetY)

    // NOTE: 110, or A2. scales up to 440, A4
    const minV = Math.log(110)
    const maxV = Math.log(440)
    const scale = (maxV - minV) / (500 - 0)

    function positionToValue(invertedY) {
      return Math.exp(minV + scale * (invertedY - 0));
    }

    // function valueToPosition(value) {
    //   return (Math.log(value) - minV) / scale + 0;
    // }

    const value = positionToValue(Number(invertedY));
    props.chromaticControlProps.changeYValue(value);

    // props.chromaticControlProps.changeYValue(((invertedY + 162) * 0.40))


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
