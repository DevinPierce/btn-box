import React from 'react';

function About (props) {

  const handleClick = (event) => {
    if(event.nativeEvent.target.tagName !== 'A'){
      props.closeModal()
    }
  }

  return (
    <div
      id="about-page"
      onClick={(event)=>handleClick(event)}
      >
        <p>
          .btn-box was inspired by the <a href="https://en.wikipedia.org/wiki/Stradella_bass_system" target="_blank" rel="noopener noreferrer">Stradella Bass System</a> used in most accordions.
        </p>
        {/* <img src={window.location.origin + '/120-button_Stradella_bass_system_chart.png'}/> */}
        <p>
          Built with <a href="https://tonejs.github.io/" target="_blank" rel="noopener noreferrer" >Tone.js</a>
        </p>
    </div>
  )

}

export default About
