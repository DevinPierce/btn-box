import React from 'react';

export default class FrequencyNoteDisplay extends React.Component {

  constructor(props){
    super(props)
    this.canvas = React.createRef()
  }

  render(){

    return (
      <div id="frequency-note-display">
        <canvas width='300px' height='200px' ref={this.canvas} ></canvas>
      </div>
      )

  }

  componentDidMount(){
    const ctx = this.canvas.current.getContext('2d')
    ctx.font = "30px Arial";
    setInterval(() => {
      ctx.clearRect(0, 0, 300, 200);
      // ctx.fillText(Math.random(), 100, 100)
      ctx.fillText(this.props.getRootNote(), 130, 75)
      ctx.fillText(Math.round(this.props.getRootFrequency()) + 'Hz', 110, 155)
    }, 75)
  }

}
