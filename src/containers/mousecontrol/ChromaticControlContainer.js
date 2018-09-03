import React, { Component } from 'react';

import ChromaticControl from '../../components/mousecontrol/ChromaticControl'

export default class ChromaticControlContainer extends Component {

  render(){
    return (
      <ChromaticControl
        chromaticControlProps={this.props.chromaticControlProps}
      />
    )
  }

}
