import React from 'react';

import KeyView from './KeyView'

export default function KeyboardView (props) {

  return (
    <div id="keyboard-view">
      <div id="row-one" className="keyboard-row">
        <KeyView key="Q" k="Q" pressed={props.keyDowns["KeyQ"]} chord="Aug" />
        <KeyView key="W" k="W" pressed={props.keyDowns["KeyW"]} chord="dim" />
        <KeyView key="E" k="E" pressed={props.keyDowns["KeyE"]} chord="Maj7" />
        <KeyView key="R" k="R" pressed={props.keyDowns["KeyR"]} chord="minMaj7" />
        <KeyView key="T" k="T" pressed={props.keyDowns["KeyT"]} chord="1/2dim7" />
      </div>
      <div id="row-two" className="keyboard-row">
        <KeyView key="A" k="A" pressed={props.keyDowns["KeyA"]} chord="Maj" />
        <KeyView key="S" k="S" pressed={props.keyDowns["KeyS"]} chord="min" />
        <KeyView key="D" k="D" pressed={props.keyDowns["KeyD"]} chord="Dom7" />
        <KeyView key="F" k="F" pressed={props.keyDowns["KeyF"]} chord="min7" />
        <KeyView key="G" k="G" pressed={props.keyDowns["KeyG"]} chord="dim7" />
      </div>
      <div id="row-three" className="keyboard-row">
        <KeyView key="Z" k="Z" pressed={props.keyDowns["KeyZ"]} chord="Maj6" />
        <KeyView key="X" k="X" pressed={props.keyDowns["KeyX"]} chord="min6" />
        <KeyView key="C" k="C" pressed={props.keyDowns["KeyC"]} chord="Sus2" />
        <KeyView key="V" k="V" pressed={props.keyDowns["KeyV"]} chord="Sus4" />
      </div>
      <div id="space-bar" className="keyboard-row">
        <KeyView key="Space" k="Space" pressed={props.keyDowns["Space"]} chord="Bass" />
      </div>
    </div>
    )

}
