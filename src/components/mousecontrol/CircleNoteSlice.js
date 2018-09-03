import React from 'react';

export default function CircleNoteSlice (props) {

  const handleMouseEnter = () => {
    props.circleControlProps.setNotes(props.note)
    props.circleControlProps.toneStart()
  }
  const handleMouseLeave = () => {
    props.circleControlProps.toneStop()
  }

  return (
    <div
      className={`note-slice position${props.position}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      >
      <div className="note-symbol">
        {props.note}
      </div>
    </div>
  )

}
