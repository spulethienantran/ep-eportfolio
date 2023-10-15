import React, { useEffect, useState } from 'react';

import './ProfilePage.css';
import NavBar from '../../Components/NavBar/NavBar';
import ProfileAvatar from '../../Components/ProfileAvatar/ProfileAvatar';
import IconButton from '../../Components/Buttons/IconButton/IconButton';
import { faHeart, faPen, faUserCheck, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import UserStatsButton from '../../Components/Buttons/UserStatsButton/UserStatsButton';

import ProjectList from '../../Components/Lists/ProjectList';
import { useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios';
import { API } from '../../Constants';

function ProfilePage({ userData }) {

  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  const apiURL = `/api/users/${userId}/information`;

  const [userProfileData, setUserProfileData] = useState({});

  const [projectListsData, setProjectListsData] = useState([]);

  const OnCollaborationsClicked = () => {
    setProjectListsData(userProfileData.collaborateProjects);
  }

  const OnProjectsClicked = () => {
    setProjectListsData(userProfileData.personalProjects);
  }

  const OnFollowClicked = () => {
    const requestBody = {
      userId: userData.userId,
      userBeingFollowedId: userId,
    }
    axios
      .post(API.followURL, requestBody, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  }

  const OnUnfollowClicked = () => {
    const followId = GetFollowIdForCurrentUser();
    if (!followId) {
      console.log('Follow ID not found for the current user');
      return;
    }
    axios
      .delete(`/api/follow/${followId}/unfollow`, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(()=> {
    axios
      .get(apiURL, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then(response => {
        const JSONFormat = JSON.stringify(response.data.responseObject);
        setUserProfileData(JSON.parse(JSONFormat));
      })
  }, [apiURL]);

  useEffect(()=> {
    setProjectListsData(userProfileData.personalProjects);
  }, [userProfileData]);

  const IsAlreadyFollowed = () => {
    return userProfileData?.userFollowers?.some(follower => follower.userId === userData?.userId);
  }

  const GetFollowIdForCurrentUser = () => {
    const followData = userProfileData?.userFollowers?.find(follower => follower.userId === userData?.userId);
    return followData?.followId;
  }

  return (
    <div className='wrapper ProfilePage-Wrapper'>
      <NavBar />
      <div className='ProfilePage-ContentContainer'>
        <div className='ProfilePage-Content'>
          <div className='ProfilePage-ProfileHeader'>
            <div className='ProfilePage-UserAvatarContainer'>
              <ProfileAvatar userClassName='ProfilePage-UserAvatar' defaultClassName='ProfilePage-DefaultUserAvatar' userAvatar={userProfileData?.userImage?.photoEncode64}/>
            </div>
            <div className='ProfilePage-UserFullNameContainer'>
              <p className='heading-3 ProfilePage-UserFullName'>{userProfileData.fullname}</p>
              {
                userId === userData.userId 
                ? (
                    <IconButton icon={faPen} className='ProfilePage-Action' onClick={() => {navigate('/EditProfile')}}/>
                  )
                : (
                    IsAlreadyFollowed() 
                    ? (
                        <IconButton icon={faUserCheck} className='ProfilePage-Action' onClick={OnUnfollowClicked}/>
                      )
                    : (
                        <IconButton icon={faUserPlus} className='ProfilePage-Action' onClick={OnFollowClicked}/>
                      )
                  )
              }
            </div>
            <div className='ProfilePage-UserInformationContainer'>
              <p className='paragraph-1 ProfilePage-UserMajor'>{userProfileData.major}</p>
              <p className='paragraph-1 ProfilePage-UserSchool'>@ {userProfileData.school}</p>
            </div>
          </div>
          <div className='ProfilePage-ProfileSocialStats'>
            <UserStatsButton StatsCounter={userProfileData.personalProjects?.length || 0} StatsTitle={'Projects'} onClick={OnProjectsClicked} />
            <UserStatsButton StatsCounter={userProfileData.collaborateProjects?.length || 0} StatsTitle={'Collaborations'} onClick={OnCollaborationsClicked} />
            <UserStatsButton StatsCounter={userProfileData.userFollowers?.length || 0} StatsTitle={'Followers'} onClick={()=>{}} />
          </div>
          <ProjectList className='ProfilePage-ProjectListContainer' ProjectListsData={projectListsData}/>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  userData: state.user.userData,
});

export default connect(mapStateToProps)(ProfilePage)