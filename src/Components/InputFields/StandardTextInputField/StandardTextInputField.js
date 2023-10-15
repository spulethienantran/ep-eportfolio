import React from 'react'

import './StandardTextInputField.css'

function StandardTextInputField(props) {
  const { onChange } = props;
  const className=`${props.className} StandardTextInputField`;

  const HandleInputChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  }

  return (
    <input type={props.type ? props.type : 'text'} 
           placeholder={props.placeholder} 
           className={className} 
           value={props.value}
           name={props.name}
           onChange={HandleInputChange}/>
  )
}

export default StandardTextInputField