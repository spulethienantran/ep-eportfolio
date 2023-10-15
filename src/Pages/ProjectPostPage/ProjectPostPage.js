import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import ProfileAvatar from '../../Components/ProfileAvatar/ProfileAvatar';
import IconButton from '../../Components/Buttons/IconButton/IconButton';
import './ProjectPostPage.css';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import CollaboratorList from '../../Components/Lists/CollaboratorList/CollaboratorList';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../Constants';

import { connect } from 'react-redux';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

function ProjectPostPage({ userData }) {

  const navigate = useNavigate();
  const location = useLocation();
  const projectId = location.state?.projectId;

  const apiURL = `/api/project/${projectId}/information`;

  const [projectInformation, setProjectInformation] = useState({});
  const [projectCreationDays, setProjectCreationDays] = useState();

  const OnNavigateProfile = (userId) => {
    navigate('/Profile',  {state: {userId}});
  }

  const OnEditProjectPost = (projectId) => {
    navigate('/EditProject', {state: { projectId }});
  }

  const OnLoveProjectPost = (projectId) => {
    
  }

  useEffect(() => {
    axios
      .get(apiURL, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then(response => {
        const JSONFormat = JSON.stringify(response.data.responseObject);
        setProjectInformation(JSON.parse(JSONFormat));
      })
  }, [apiURL]);

  useEffect(() => {
    const projectCreationDate = new Date(projectInformation?.projectCreationDate);
    const currentDate = new Date();
    const differenceInTime = currentDate - projectCreationDate;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    setProjectCreationDays(differenceInDays);
  }, [projectInformation])

  return (
    <div className='wrapper ProjectPostPage-Wrapper'>
      <NavBar />
      <div className='ProjectPostPage-ContentContainer'>
        <div className='ProjectPostPage-Content'>
          <div className='ProjectPostPage-PostHeader'>
            <div className='ProjectPostPage-AuthorInformationContainer'>
              <ProfileAvatar userClassName='ProjectPostPage-UserAvatar' defaultClassName='ProjectPostPage-DefaultUserAvatar' onClick={()=> {OnNavigateProfile(projectInformation?.projectOwner?.userId)}} userAvatar={projectInformation?.projectOwner?.userImage?.photoEncode64}/>
              <div className='ProjectPostPage-AuthorInformation'>
                <p className='heading-3 ProjectPostPage-AuthorName'>{projectInformation?.projectOwner?.fullname}</p>
                <p className='paragraph-1 ProjectPostPage-PostedDate'>{projectCreationDays} days ago</p>
              </div>
            </div>
            {projectInformation?.projectOwner?.userId === userData?.userId ? (
              <>
                <IconButton icon={faPen} className='ProjectPostPage-Action' onClick={() => {OnEditProjectPost(projectId)}}/>
              </>
            ): (
              <>
                <IconButton icon={faHeart} className='ProjectPostPage-Action' onClick={() => {OnLoveProjectPost(projectId)}}/>
              </>
            )}

          </div>
          <div className='ProjectPostPage-PostBannerContainer'>
            <img src={projectInformation?.projectPhoto?.photoEncode64} alt='Project Banner'className='ProjectPostPage-PostBanner'/>
          </div>
          <div className='ProjectPostPage-PostContentContainer'>
            <p className='heading-3 ProjectPostPage-PostTitle'>{projectInformation?.projectTitle}</p>
            <div className='ProjectPostPage-ProjectDescriptionContainer'>
              <p className='paragraph-1 ProjectDescription'>{!projectInformation?.projectDescription ? 'No Description.' : projectInformation?.projectDescription}</p>
            </div>
            <p className='heading-3 ProjectPostPage-PostTitle'>Collaborators</p>
              <CollaboratorList userClassName='ProjectPostPage-UserAvatar' defaultClassName='ProjectPostPage-DefaultUserAvatar' />
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = state => ({
  userData: state.user.userData,
});
export default connect(mapStateToProps)(ProjectPostPage)