import React from 'react';

import { connect } from 'react-redux';

import {toggleMouseControlViewAction} from '../../redux/actions/interfaceChangeActions'

function MouseModeToggleMasterVolume (props) {

  const handleVolumeChange = (event) => {
    props.changeMasterVolume(event.target.value - 100)
    console.log(event.target.value - 100);
  }

  return (
    <div id="mouse-mode-toggle-master-volume" className="tone-effect-control">
      <div id="mouse-mode-toggle-button" className="toggle-volume-element">
        <button onClick={props.toggleMouseControlView}>TEMPORARY BUTTON HERE!
      </button>
      </div>
      <div id="master-volume" className="toggle-volume-element">
        <label htmlFor="mastervolume">Volume</label>
        <input
          id="master-volume-slider"
          type="range"
          className="slider"
          name="mastervolume"
          onChange={handleVolumeChange}
          value={props.masterVolume.volume + 100}
         />
      </div>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    masterVolume: state.audioSettings.master
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleMouseControlView: () => dispatch(toggleMouseControlViewAction()),
    // changeMasterVolume: value => dispatch(changeMasterVolumeAction(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MouseModeToggleMasterVolume)
