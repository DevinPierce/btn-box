import React, { Component } from 'react';

import ChromaticControlContainer from './mousecontrol/ChromaticControlContainer'
import CircleControlContainer from './mousecontrol/CircleControlContainer'

export default class MouseControlContainer extends Component {

  renderControlContainer = () => {
    // TODO: will render either container by depending on view toggle
    if (true){
      return <ChromaticControlContainer
         mouseControlProps={this.props.mouseControlProps}
       />
    } else if (false) {
      return <CircleControlContainer
         mouseControlProps={this.props.mouseControlProps}
       />
    }
  }

  render(){
    return (
      <div id="mouse-control-container">
        {this.renderControlContainer()}
      </div>
    )
  }

}
