import React, { Component } from 'react';

// import MouseControlContainer from './MouseControlContainer'
import ToneEffectsBarContainer from './ToneEffectsBarContainer'
import MouseKeyboardContainer from './MouseKeyboardContainer'
// import KeyboardViewContainer from './KeyboardViewContainer'

export default class InterfaceContainer extends Component {

  // state = {
  //   aDown: false,
  //   sDown: false,
  //   dDown: false,
  // }

  // checkKeyDown = (key) => {
  //   return this.state[key + 'Down']
  // }

  render(){
    return (
      <div id="interface-container">
        <ToneEffectsBarContainer />
        <MouseKeyboardContainer
          mouseControlProps={this.props.mouseControlProps}
          keyDowns={this.props.keyDowns}
        />
        {/* <MouseControlContainer
          mouseControlProps={this.props.mouseControlProps}
        /> */}
        {/* <KeyboardViewContainer
          keyDowns={this.props.keyDowns}
         /> */}
      </div>
    )
  }

  // componentDidMount(){
  //   // NOTE: should this all be lifted to Audio along with keydowns? seems like it, everything it's doing is being passed down anyway
  //   document.body.addEventListener('keydown', event=>{
  //     if (this.props.checkKeyDown(event.key) === false){
  //       this.props.keyControlProps.keyDown(event.key)
  //       this.setState({
  //         [event.key + 'Down']: true
  //       })
  //     }
  //   })
  //
  //   document.body.addEventListener('keyup', event=>{
  //     if (this.props.checkKeyDown(event.key) === true){
  //       this.props.keyControlProps.keyUp(event.key)
  //       this.setState({
  //         [event.key + 'Down']: false
  //       })
  //     }
  //   })
  //
  // }

}
