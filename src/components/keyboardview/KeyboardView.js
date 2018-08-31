import React from 'react';

import KeyView from './KeyView'

export default function KeyboardView (props) {

  const renderKeyViews = () => {
    const keyViews = []
    for (let key in props.keyDowns){
      keyViews.push(<KeyView key={key} k={key} pressed={props.keyDowns[key]} />)
    }
    return keyViews
  }

  return (
    <div id="keyboard-view">
      {renderKeyViews()}
    </div>
    )

}
