import React from 'react';

import { connect } from 'react-redux';

import CircleNoteSlice from './CircleNoteSlice'

function CircleControl (props) {

  function renderCircleNoteSlices() {
    const notes = ['C4', 'G3', 'D4', 'A3', 'E4', 'B3', 'F#4', 'Db4', 'Ab3', 'Eb4', 'Bb3', 'F4']
    const noteSymbols = ['C', 'G', 'D', 'A', 'E', 'B', 'G\u266D\nF\u266F', 'D\u266D', 'A\u266D', 'E\u266D', 'B\u266D', 'F']
    return notes.map((note, index) => {
      return <CircleNoteSlice
        key={note}
        circleControlProps={props.circleControlProps}
        note={note}
        noteSymbol={noteSymbols[index]}
        position={index}
      />
    })
  }

  return (
    <div
      id="circle-control-field"
      className={props.interfaceMode.circleControl ? "show" : "hidden"}
    >
      {renderCircleNoteSlices()}
    </div>
  )

}

function mapStateToProps(state) {
  return {
    interfaceMode: state.interfaceMode
  }
}

export default connect(mapStateToProps)(CircleControl)
