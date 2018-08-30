import React from 'react';

export default function ChromaticControl (props) {

  const elementHeight = 500

  const handleMouseMove = (event) => {
    const scaledX = (event.nativeEvent.offsetX / 20) - 25
    props.mouseControlProps.changeXValue(scaledX)
    // IDEA: x-axis should control "chord volume," icreasing volume up the triad as you go right
    let invertedY = (elementHeight - event.nativeEvent.offsetY)
    // IDEA: get Y value to scale logarithmically I think?
    props.mouseControlProps.changeYValue((invertedY + 16.35) * 2)
    // NOTE: 16.35 * 2 = 32.7, or C1. scales up to about 1032.7hz, just shy of C6
    // IDEA: Y value passed here is pretty arbitrary; I guess it depends on what I decide to make the range, and what information the mouse input element displays later
  }
  const handleMouseOver = (event) => {
    props.mouseControlProps.toneStart(event.nativeEvent.offsetY)
  }
  const handleMouseOut = () => {
    props.mouseControlProps.toneStop()
  }

  return (
    <div
      id="chromatic-control-field"
      onMouseMove={event=>handleMouseMove(event)}
      onMouseOver={event=>handleMouseOver(event)}
      onMouseOut={()=>handleMouseOut()}
    >

    </div>
  )

}
