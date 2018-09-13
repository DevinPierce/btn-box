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
      ctx.font = "64px Titillium Web";
      let rootNote = this.props.getRootNote()
      console.log(rootNote);
      if (rootNote[1] === '#'){
        rootNote = rootNote[0] + '\u266F' + rootNote[2]
      } else if (rootNote[1] === 'b'){
        rootNote = rootNote[0] + '\u266D' + rootNote[2]
      } else {
        rootNote
      }
      ctx.fillText(rootNote, 65, 80)
      ctx.fillText(Math.round(this.props.getRootFrequency()) + 'Hz', 65, 160)


      // NOTE: notes need to be sorted in ascending order, but activeNotes array is not ordered. Also, accidentals are wrong, since Tone toNote always returns sharps.  it might be easier to map out all the chords somewhere, or transpose off root note based on active notes or something? I don't know
      // ctx.font = "20px Titillium Web";
      // let activeNotes = this.props.getActiveNotes().map(note => {
      //   if (note[1] === '#'){
      //     return note[0] + '\u266F' + note[2]
      //   } else if (note[1] === 'b'){
      //     return note[0] + '\u266D' + note[2]
      //   } else {
      //     return note
      //   }
      // })
      // let y = 180
      // activeNotes.forEach(note => {
      //   ctx.fillText(note, 10, y)
      //   y -= 20
      // })

    }, 75)
  }

}
