import React, { Component } from 'react';

import { connect } from 'react-redux';

import ChromaticControlContainer from './mousecontrol/ChromaticControlContainer'
import CircleControlContainer from './mousecontrol/CircleControlContainer'

class MouseControlContainer extends Component {

  renderControlContainer = () => {

    if (this.props.interfaceMode.chromaticControl){
      return <ChromaticControlContainer
        chromaticControlProps={this.props.chromaticControlProps}
       />
    } else if (this.props.interfaceMode.circleControl) {
      return <CircleControlContainer
        circleControlProps={this.props.circleControlProps}
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

function mapStateToProps(state) {
  return {
    interfaceMode: state.interfaceMode
  }
}

export default connect(mapStateToProps)(MouseControlContainer)
