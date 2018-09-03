import React from 'react';

import CircleNoteSlice from './CircleNoteSlice'

export default function CircleControl (props) {

  function renderCircleNoteSlices() {
    const notes = ['C4', 'G3', 'D4', 'A3', 'E4', 'B3', 'F#4', 'Db4', 'Ab3', 'Eb4', 'Bb3', 'F4']
    return notes.map((note, index) => {
      return <CircleNoteSlice
        key={note}
        circleControlProps={props.circleControlProps}
        note={note}
        position={index}
      />
    })
  }

  return (
    <div
      id="circle-control-field"
    >
      {renderCircleNoteSlices()}
    </div>
  )

}
