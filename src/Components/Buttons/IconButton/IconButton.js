import React from 'react'

import './IconButton.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function IconButton(props) {
  const className = `${props.className} IconButton-Container`
  return (
    <button className={className} onClick={props.onClick}>
        <FontAwesomeIcon icon={props.icon} />
    </button>
  )
}

export default IconButton