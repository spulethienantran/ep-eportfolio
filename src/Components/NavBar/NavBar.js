import React, { useState } from 'react';

import './NavBar.css'

import Logo from '../../Components/Logo/Logo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faSearch } from '@fortawesome/free-solid-svg-icons';

import { faBell, faIdBadge, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import NavBarButton from '../Buttons/NavBarButton/NavBarButton';
import IconButton from '../Buttons/IconButton/IconButton';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';

import axios from 'axios';
import SearchBox from '../InputFields/SearchBox/SearchBox';

function NavBar({ userData }) {

  const navigate = useNavigate();

  const [searchInformation, setSearchInformation] = useState({
    searchUsername: '',
  });

  const OnSearch = (e) => {
    if (e.key === 'Enter') {
      axios.get(`/api/users/search?username=${searchInformation?.searchUsername}`)
        .then(response => {
          if (response.data.responseObject.length > 0) {
            const userId = response.data.responseObject[0].userId;
            navigate('/Profile', {state: { userId }});
          } else {
            // Handle user not found, maybe show an alert or a message
            console.log("User not found");
          }
        });
    }
  }

  const HandleSearchInput = (propertyName, inputValue) => {
    setSearchInformation({...searchInformation, [propertyName]: inputValue});
  }

  const NavigateProfile = (userId) => {
    navigate('/Profile', {state: { userId }});
  }

  const OnSignOut = () => {
    navigate('/');
  }

  return (
    <div className='NavBar-Container'>
        <div className='NavBar-TopContainer'>
          <div className='NavBar-UserProfileContainer'>
            <div className='NavBar-UserAvatarContainer'>
              <ProfileAvatar userClassName='NavBar-UserAvatar' defaultClassName='NavBar-DefaultUserAvatar' userAvatar={userData?.userImage?.photoEncode64} onClick={()=>{NavigateProfile(userData?.userId)}}/>
            </div>
            <div className='NavBar-UserInformationContainer'>
              <p className='heading-3 NavBar-UserName'>{userData?.fullname}</p>
              <p className='paragraph-2 NavBar-UserMajor'>{userData?.major}</p>
            </div>
          </div>
          <SearchBox name='searchUsername' onChange={HandleSearchInput}placeholder='Search others by usernames...'
          onKeyPress={OnSearch}/>
          <NavBarButton icon={faSquarePlus} title='Post Project' onClick={()=> {navigate('/PostProject')}}/>
          {/*<NavBarButton icon={faBell} title='Notifications'onClick={()=>{Navigate('/PostProject')}}/>*/}
          <NavBarButton icon={faIdBadge} title='Profile' onClick={()=>{NavigateProfile(userData.userId)}}/>
        </div>
        <div className='NavBar-BottomContainer'>
          <div className='NavBar-LogoContainer'>
            <Logo className='NavBar-Logo'/>
            <p className='paragraph-2'><em>"Projects by Peers, Passion in Progress."</em></p>
          </div>
          <IconButton icon={faArrowRightFromBracket} className='NavBar-SignOut' onClick={OnSignOut}/>
        </div>
    </div>
  )
}

const mapStateToProps = state => ({
  userData: state.user.userData,
});

export default connect(mapStateToProps)(NavBar)