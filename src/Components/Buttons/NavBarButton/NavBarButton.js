import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './NavBarButton.css';

function NavBarButton(props) {
  return (
    <button className='NavBarButton-Container' onClick={props.onClick}>
        <FontAwesomeIcon icon={props.icon} className='NavBarButton-Icon'/>
        <p className='paragraph-1 NavBarButton-Description'>{props.title}</p>
    </button>
  )
}

export default NavBarButton