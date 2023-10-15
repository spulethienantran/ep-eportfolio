import React, { useState, useEffect } from 'react';

import './ProfileAvatar.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

function ProfileAvatar(props) {

  const userClassName = `${props.userClassName} ProfileAvatar-User`;
  const defaultClassName = `${props.defaultClassName} ProfileAvatar-Default`  
  
  const { userAvatar } = props;

  return (
    <>
        {userAvatar ? 
        (<>
          <button className='ProfileAvatar-Container' onClick={props.onClick}>
            <img src={userAvatar} alt='User Avatar'className={userClassName} />
          </button>
      </>)
      : (
        <>
          <button className='ProfileAvatar-Container' onClick={props.onClick}>
            <div className={defaultClassName}>
              <FontAwesomeIcon icon={faUser} />
            </div>
          </button>
        </>
      )}
    </>
  )
}

export default ProfileAvatar