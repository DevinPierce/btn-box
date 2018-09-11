import React from 'react';

import TitleBox from './metacontrols/TitleBox'
import SaveSettings from './metacontrols/SaveSettings'
import ModeToggle from './metacontrols/ModeToggle'
import MasterVolume from './metacontrols/MasterVolume'

function MetaControls (props) {

  return (
    <div id="meta-controls" className="tone-effect-control">
      <div id="title-save-toggle-container" >
        <TitleBox />
        <ModeToggle />
        <SaveSettings
          loadSettings={props.loadSettings}
        />
      </div>
      <div id="master-volume-container" >
        <MasterVolume
          changeMasterVolume={props.changeMasterVolume}
        />
      </div>
    </div>
  )

}

export default MetaControls
