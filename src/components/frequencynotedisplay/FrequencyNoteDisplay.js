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
    ctx.font = "64px Titillium Web";
    setInterval(() => {
      ctx.clearRect(0, 0, 300, 200);
      // const data = this.props.getAnalyserValues().slice(0,48)
      // const barWidth = (300 / data.length);
    	// let barHeight;
    	// let x = 0;
      // for(var i = 0; i < data.length; i++) {
      //   barHeight = data[i];
      //   ctx.fillStyle = 'rgb(' + (barHeight+250) + ',50,50)';
      //   ctx.fillRect(x,200-barHeight/2,barWidth,barHeight);
      //
      //   x += barWidth + 1;
      // }
      let rootNote = this.props.getRootNote()
      console.log(rootNote);
      if (rootNote[1] === '#'){
        rootNote = rootNote[0] + '\u266F' + rootNote[2]
      } else if (rootNote[1] === 'b'){
        rootNote = rootNote[0] + '\u266D' + rootNote[2]
      } else {
        rootNote
      }
      ctx.fillText(rootNote, 70, 75)
      ctx.fillText(Math.round(this.props.getRootFrequency()) + 'Hz', 70, 155)
    }, 50)
  }

}
