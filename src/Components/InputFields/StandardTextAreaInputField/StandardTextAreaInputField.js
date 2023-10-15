import React from 'react'

import './StandardTextAreaInputField.css'

function StandardTextAreaInputField(props) {
  const className=`${props.className} StandardTextAreaInputField`
  const { onChange } = props;

  const HandleInputChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  }
  return (
    <textarea placeholder={props.placeholder} 
              className={className} 
              value={props.value}
              name={props.name}
              onChange={HandleInputChange}/>
  )
}

export default StandardTextAreaInputField