import React from 'react'

import './Logo.css'

import EP_Logo from '../../Assets/Images/Logo_EP.png';


function Logo(props) {
  const className = `${props.className} Logo-Container`
  return (
    <div className={className}>
        <img src={EP_Logo} alt='EP LOGO'/>
    </div>
  )
}

export default Logo