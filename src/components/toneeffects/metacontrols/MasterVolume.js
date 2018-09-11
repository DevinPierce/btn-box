import React from 'react';

import { connect } from 'react-redux';

function MasterVolume (props) {

  const handleVolumeChange = (event) => {
    props.changeMasterVolume(event.target.value)
    console.log(event.target.value);
  }

  return (
    <React.Fragment>
      <label htmlFor="mastervolume">Volume</label>
      <input
        id="master-volume-slider"
        type="range"
        className="slider"
        name="mastervolume"
        min="-60"
        max="0"
        onChange={handleVolumeChange}
        value={props.masterVolume.volume}
       />
    </React.Fragment>
  )

}

function mapStateToProps(state) {
  return {
    masterVolume: state.audioSettings.master
  }
}

export default connect(mapStateToProps)(MasterVolume)
