import React from 'react';

export default function KeyView (props) {

  return (
    <div className={props.pressed ? "key pressed" : "key"}>
      {props.k}
      <br />
      {props.chord}
    </div>
    )

}
