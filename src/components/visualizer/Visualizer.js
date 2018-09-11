import React from 'react';

export default class Visualizer extends React.Component  {

  constructor(props){
    super(props)
    this.canvas = React.createRef()
  }

  render(){
    return (
      <div id="visualizer-container">
        <canvas width="700" height="500" ref={this.canvas}></canvas>
      </div>
    )
  }

  componentDidMount(){
    const ctx = this.canvas.current.getContext('2d')
    setInterval(() => {
      let data = this.props.getAnalyserValues().slice()
      // console.log(data.reduce((sum, n)=>{return sum += n}) / data.length);
    	ctx.fillStyle = 'rgb(192, 192, 192)';
    	// ctx.fillStyle = 'hsl(' + Math.abs(data.reduce((sum, n)=>{return sum += n}) / data.length) * 360  + ', 10%, 30%)';
    	ctx.fillRect(0, 0, 700, 500);
    	ctx.lineWidth = 6;
    	ctx.strokeStyle = 'rgb(220, 220, 220)';
    	ctx.beginPath();
    	const sliceWidth = 700 * 1.0 / data.length;
    	let x = 0;
    	for(let i = 0; i < data.length; i++) {
        const v = data[i]
        const y = v * 500/8 + 250;
        if(i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }
    	ctx.lineTo(this.canvas.width, this.canvas.height/2);
        ctx.stroke();
    }, 33)
  }
}
