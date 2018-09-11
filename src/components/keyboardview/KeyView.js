import React from 'react';

import { connect } from 'react-redux';

function KeyView (props) {

  return (
    <div className={props.keyDowns['Key' + props.k] || props.keyDowns[props.k] ? "key pressed" : "key"}>
      {props.k}
      <br />
      {props.chord}
    </div>
    )

}

function mapStateToProps(state) {
  return {
    keyDowns: state.keyDowns
  }
}

export default connect(mapStateToProps)(KeyView)
