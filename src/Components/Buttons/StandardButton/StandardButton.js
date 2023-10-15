import React from 'react'

import './StandardButton.css'

function StandardButton(props) {
  const className=`${props.className} StandardButton-Container`
  return (
    <button className={className} onClick={props.onClick}>
        <p className='heading-4'>{props.title}</p>
    </button>
  )
}

export default StandardButton