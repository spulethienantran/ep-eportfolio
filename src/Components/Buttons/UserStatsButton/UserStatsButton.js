import React from 'react'

import './UserStatsButton.css'

function UserStatsButton(props) {
  const className = `${props.className} UserStatsButton-Container`;
  return (
    <button className={className} onClick={props.onClick}>
        <p className='paragraph-1 UserStatsButton-StatsCounter'>{props.StatsCounter}</p>
        <p className='heading-4 UserStatsButton-StatsTitle'>{props.StatsTitle}</p>
    </button>  
  )
}

export default UserStatsButton