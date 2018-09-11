import React, { Component } from 'react';

import ChromaticControlContainer from './mousecontrol/ChromaticControlContainer'
import CircleControlContainer from './mousecontrol/CircleControlContainer'
import Visualizer from '../components/visualizer/Visualizer'

class MouseControlContainer extends Component {



  render(){
    return (
      <React.Fragment>
        <div id="mouse-control-container">
          <Visualizer
            {...this.props.visualizerProps}
          />
          <ChromaticControlContainer
           chromaticControlProps={this.props.chromaticControlProps}
          />
          <CircleControlContainer
           circleControlProps={this.props.circleControlProps}
          />
        </div>
      </React.Fragment>
    )
  }

}

export default MouseControlContainer
