import React from 'react';

import KeyView from './KeyView'

export default function KeyboardView (props) {

  return (
    <div id="keyboard-view">
      <div id="row-one" className="keyboard-row">
        <KeyView key="Q" k="Q" chord="aug" />
        <KeyView key="W" k="W" chord="dim" />
        <KeyView key="E" k="E" chord="M7" />
        <KeyView key="R" k="R" chord="m/M7" />
        <KeyView key="T" k="T" chord="&#189;dim7" />
      </div>
      <div id="row-two" className="keyboard-row">
        <KeyView key="A" k="A" chord="maj" />
        <KeyView key="S" k="S" chord="min" />
        <KeyView key="D" k="D" chord="7" />
        <KeyView key="F" k="F" chord="min7" />
        <KeyView key="G" k="G" chord="dim7" />
      </div>
      <div id="row-three" className="keyboard-row">
        <KeyView key="Z" k="Z" chord="M6" />
        <KeyView key="X" k="X" chord="m6" />
        <KeyView key="C" k="C" chord="sus2" />
        <KeyView key="V" k="V" chord="sus4" />
      </div>
      <div id="space-bar" className="keyboard-row">
        <KeyView key="Space" k="Space" chord="Bass" />
      </div>

    </div>
    )

}
