import React from 'react';

import { connect } from 'react-redux';

import {toggleModalAction} from '../../../redux/actions/modalActions'

function TitleBox (props) {

  return (
    <div id="title-box">
      <div
        id="about-link"
        onClick={props.toggleModalAction}
        >?</div>
      <div id="title">.btn-box</div>
    </div>
  )

}

function mapDispatchToProps(dispatch) {
  return {
    toggleModalAction: () => dispatch(toggleModalAction()),
  }
}

export default connect(null, mapDispatchToProps)(TitleBox)
