import React from 'react';

import { connect } from 'react-redux';

import {toggleMouseControlViewAction} from '../../redux/actions/interfaceChangeActions'

function MouseControlToggle (props) {

  return (
    <div id="mouse-control-toggle" className="tone-effect-control">
      <button onClick={props.toggleMouseControlView}>TEMPORARY BUTTON HERE!</button>
    </div>
  )

}

function mapDispatchToProps(dispatch) {
  return {
    toggleMouseControlView: () => dispatch(toggleMouseControlViewAction())
  }
}

export default connect(null, mapDispatchToProps)(MouseControlToggle)
