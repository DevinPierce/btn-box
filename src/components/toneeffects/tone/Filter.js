// import React from 'react';
//
// import { connect } from 'react-redux';
//
// function Filter (props) {
//
//   const handleChange = (event) => {
//     switch (event.target.dataset.control){
//       case "type":
//         props.filterType(event.target.value)
//         break;
//       case "frequency":
//         props.filterFrequency(event.target.value * 100)
//         break;
//       case "resonance":
//         props.filterResonance(event.target.value / 10)
//         break;
//       default:
//     }
//   }
//
//   return (
//     <div id="filter-controls" className="tone-control">
//       <div className="tone-label">Filter</div>
//       <div id="filter-inputs">
//         <div id="filter-select" className="filter-inputs">
//           <label htmlFor="type" className="slider-label">Type</label>
//           <select
//             name="type"
//             data-control="type"
//             onChange={handleChange}
//             defaultValue={props.filter.type}
//             >
//             <option value="highpass" >High-pass</option>
//             <option value="lowpass" >Low-pass</option>
//           </select>
//         </div>
//         <div id="filter-sliders" className="filter-inputs">
//           <label htmlFor="frequency" className="slider-label">Frequency</label>
//           <input
//             type="range"
//             name="frequency"
//             className="slider"
//             onChange={handleChange}
//             data-control="frequency"
//             min="1"
//             max="200"
//             value={props.filter.frequency / 100}
//           />
//           <label htmlFor="resonance" className="slider-label">Resonance</label>
//           <input
//             type="range"
//             name="resonance"
//             className="slider"
//             onChange={handleChange}
//             data-control="resonance"
//             min="0"
//             max="30"
//             value={props.filter.Q * 10}
//           />
//         </div>
//       </div>
//     </div>
//   )
//
// }
//
// function mapStateToProps(state) {
//   return {
//     filter: state.audioSettings.filter
//   }
// }
//
// export default connect(mapStateToProps)(Filter)
