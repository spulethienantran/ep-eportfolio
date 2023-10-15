import React from 'react';

import ProfileAvatar from '../../ProfileAvatar/ProfileAvatar';
import { useNavigate } from 'react-router-dom';

function CollaboratorList(props) {
  const className = `${props.className} CollaboratorList-Container`;

  const navigate = useNavigate();

  const OnNavigateProfile = () => {
    navigate('/Profile');
  }

  return (
    <div className={className}>
        <ProfileAvatar userClassName={props.userClassName} defaultClassName={props.defaultClassName} onClick={OnNavigateProfile} />
    </div>
  )
}

export default CollaboratorList