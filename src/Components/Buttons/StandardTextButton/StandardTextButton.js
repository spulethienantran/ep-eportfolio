import React from 'react'

import './StandardTextButton.css'

function StandardTextButton(props) {
  const className = `${props.className} StandardTextButton-Container`; 
  return (
    <button className={className} onClick={props.onClick}>
        <p className='paragraph-2'><strong>{props.text}</strong></p>
    </button>
  )
}

export default StandardTextButton