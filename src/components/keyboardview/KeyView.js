import React from 'react';

import { connect } from 'react-redux';

function KeyView (props) {

  return (
    <div className={props.keyDowns['Key' + props.k] || props.keyDowns[props.k] ? "key pressed" : "key"}>
      <div className="key-letter">{props.k}</div>
      <div className="chord-symbol">{props.chord}</div>
    </div>
    )

}

function mapStateToProps(state) {
  return {
    keyDowns: state.keyDowns
  }
}

export default connect(mapStateToProps)(KeyView)
