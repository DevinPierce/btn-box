import React from 'react';

import {toggleMouseControlViewAction} from '../../../redux/actions/interfaceChangeActions'

import { connect } from 'react-redux';

function ModeToggle (props) {

  const renderButton = () => {
    if (props.interfaceMode.chromaticControl){
      return <button onClick={props.toggleMouseControlView}>TEMPORARY BUTTON HERE! switch to circle
      </button>
    } else if (props.interfaceMode.circleControl){
      return <button onClick={props.toggleMouseControlView}>TEMPORARY BUTTON HERE! switch to chromatic
      </button>
    }
  }

  return (
    <div id="mode-toggle">
      {renderButton()}
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
