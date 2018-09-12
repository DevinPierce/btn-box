import React from 'react';

import {toggleMouseControlViewAction} from '../../../redux/actions/interfaceChangeActions'

import { connect } from 'react-redux';

import circleIcon from '../../../svg/circle_icon.svg'
import chromaticIcon from '../../../svg/chromatic_icon.svg'

function ModeToggle (props) {

  return (
    <div id="mode-toggle">
      <div
        className={props.interfaceMode.chromaticControl ? "mode-button show" : "mode-button hidden"}
        onClick={props.toggleMouseControlView}
        >
        <object
          data={circleIcon}
          >
          </object>
      </div>
      <div
        className={props.interfaceMode.circleControl ? "mode-button show" : "mode-button hidden"}
        onClick={props.toggleMouseControlView}
        >
        <object
          data={chromaticIcon}
          >
          </object>
      </div>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    interfaceMode: state.interfaceMode
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleMouseControlView: () => dispatch(toggleMouseControlViewAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModeToggle)
