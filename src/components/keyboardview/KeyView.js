import React from 'react';

export default function KeyView (props) {

  return (
    <div className={props.pressed ? "key lit" : "key"}>
      {props.k}
    </div>
    )

}
