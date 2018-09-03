import React, { Component } from 'react';

import CircleControl from '../../components/mousecontrol/CircleControl'

export default class CircleControlContainer extends Component {

  render(){
    return (
      <CircleControl
        circleControlProps={this.props.circleControlProps}
      />
    )
  }

}
