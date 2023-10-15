import React from 'react'

import './SearchBox.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function SearchBox(props) {

  const { onChange, onKeyPress } = props;
  const className=`${props.className} SearchBox-SearchBoxContainer`;

  const HandleInputChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  }

  return (
    <div className={className}>
        <FontAwesomeIcon icon={faSearch} className="SearchBox-SearchIcon" />
        <input type='text' placeholder={props.placeholder}  value={props.value} className='SearchBox-SearchBox' onChange={HandleInputChange} name={props.name} onKeyPress={onKeyPress}/>
  </div>
  )
}

export default SearchBox