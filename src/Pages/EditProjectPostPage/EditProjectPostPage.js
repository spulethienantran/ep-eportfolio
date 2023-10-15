import React, { useEffect, useState, useRef } from 'react';

import './EditProjectPostPage.css';
import StandardDropDown from '../../Components/DropDowns/StandardDropDown/StandardDropDown';

import NavBar from '../../Components/NavBar/NavBar';
import IconButton from '../../Components/Buttons/IconButton/IconButton';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import StandardButton from '../../Components/Buttons/StandardButton/StandardButton';
import StandardTextInputField from '../../Components/InputFields/StandardTextInputField';
import StandardTextAreaInputField from '../../Components/InputFields/StandardTextAreaInputField/StandardTextAreaInputField';
import { useLocation, useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import axios from 'axios';
import { API } from '../../Constants';

function EditProjectPostPage({userData}) {

  const location = useLocation();
  const projectId = location.state?.projectId;

  const fileInputRef = useRef(null);
  const [imageOGWidth, setImageOGWidth] = useState(null);
  const [imageOGHeight, setImageOGHeight] = useState(null);
  const [projectBannerBase64, setProjectBannerBase64] = useState('');

  const maxWidth = 240; 
  const maxHeight = 240; 

  const apiURL = `/api/project/${projectId}/information`;

  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState('');

  const [projectData, setProjectData] = useState({});

  //populate
  const [projectInformation, setProjectInformation] = useState ({});
  
  const NavigateProfile = (userId) => {
    navigate('/Profile', {state: {userId}})
  }

  const OnDelete = () => {
    axios
      .delete(`/api/project/${projectId}/information/${userData.userId}`, {
        headers: {
          'X-API-KEY': API.key,
        },
      })
      .then(response => {
        NavigateProfile(userData?.userId);
      })
      .catch(error => {
        setIsError(true);
        setErrorMessage(error.response.data.message);
      });
  }

  const OnUpdate = (projectId) => {
    const requestBody = {
      projectTitle: projectInformation?.projectTitle,
      encodePhoto: projectBannerBase64,
      photoOGHeight: imageOGHeight,
      photoOGWidth: imageOGWidth,
      idUserEdit: userData?.userId,
      projectCollaborators: projectInformation?.projectCollaborators,
      projectDescription: projectInformation?.projectDescription,
    }
    console.log(requestBody);
    axios
      .put(apiURL, requestBody, {
        headers: {
          'X-API-KEY': API.key,
        },
      })
      .then(response => {
        navigate('/Project', {state: { projectId }});
      })
      .catch(error => {
        setIsError(true);
        setErrorMessage(error.response.data.message);
      });
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
        setProjectData(JSON.parse(JSONFormat));
      })
      .catch(error => {
        setIsError(true);
        setErrorMessage(error.response.data.message);
      })
  }, [apiURL]);

  useEffect(() => {
    console.log("Prject,", projectData);
    setProjectInformation({
      projectTitle: projectData?.projectTitle,
      encodePhoto: projectData?.projectPhoto?.photoEncode64,
      photoOGHeight: projectData?.projectPhoto?.photoOGHeight,
      photoOGWidth: projectData?.projectPhoto?.photoOGWidth,
      idUserEdit: userData?.userId,
      projectCollaborators: projectData?.projectCollaborators,
      projectDescription: projectData?.projectDescription,
    })
    setImageOGHeight(projectData?.projectPhoto?.photoOGHeight);
    setImageOGWidth(projectData?.projectPhoto?.photoOGWidth);
    console.log(projectInformation);
    setProjectBannerBase64(projectData?.projectPhoto?.photoEncode64);
  }, [projectData])

  const HandleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      const img = new Image();
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let newWidth = img.width;
        let newHeight = img.height;
  
        if (img.width > maxWidth || img.height > maxHeight) {
          if (img.width / maxWidth > img.height / maxHeight) {
            newWidth = maxWidth;
            newHeight = (img.height / img.width) * maxWidth;
          } else {
            newHeight = maxHeight;
            newWidth = (img.width / img.height) * maxHeight;
          }
        }
        const ogHeight = img.height;
        const ogWidth = img.width;
        setImageOGHeight(ogHeight);
        setImageOGWidth(ogWidth);
        canvas.width = newWidth;
        canvas.height = newHeight;
  
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
  
        const base64Data = canvas.toDataURL('image/jpeg', 0.7); // Use 'image/jpeg' for JPEG format
        setProjectInformation({ ...projectInformation, encodePhoto: base64Data });
        setProjectBannerBase64(base64Data);

      };
  
      reader.onload = (event) => {
        img.src = event.target.result;
      };
  
      reader.readAsDataURL(selectedFile);
    }
  };

  const OpenFileDialog = () => {
    fileInputRef.current.click();
  };

  const HandleInputChange = (propertyName, inputValue) => {
    if (isError) {
      setIsError(false);
    }
    setProjectInformation({...projectInformation, [propertyName]: inputValue});
  }

  return (
    <div className='wrapper EditPostProjectPage-Wrapper'>
      <NavBar />
      <div className='EditPostProjectPage-ContentContainer'>
        <div className='EditPostProjectPage-Content'>
          <p className='heading-1 EditPostProjectPage-Title'>Edit Your Project</p>
          <div className='EditPostProjectPage-UploadPhotoContainer'>
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={HandleFileInputChange}
              />
              {projectBannerBase64 === null ? (<IconButton icon={faImage} className='EditPostProjectPage-UploadPhoto'onClick={OpenFileDialog}/>) : (
              <div className='EditPostProjectPage-UploadPhotoContainer' onClick={OpenFileDialog}>
                <img src={projectBannerBase64} className='EditPostProjectPage-UploadedPhoto' alt='Uploaded Project Banner'/>
              </div>
            )}
          </div>
          {isError && (
          <>
            <p className='paragraph-2 EditPostProjectPage-ErrorMessage'>{errorMessage}</p>
          </>
        )}
          <div className='EditPostProjectPage-Form'>
            <StandardTextInputField placeholder='Project Title' 
                                                 onChange={HandleInputChange} 
                                                 name='projectTitle'
                                                 value={projectInformation?.projectTitle}/>
            <StandardDropDown placeholder='Add Collaborators' isMulti={true} name='collaborators'/>
            <StandardTextAreaInputField placeholder='Project Description' 
                                        onChange={HandleInputChange}
                                        name='projectDescription'
                                        value={projectInformation?.projectDescription}/>
          </div>
          <StandardButton title='Update' onClick={()=>{OnUpdate(projectId)}} className='EditPostProjectPage-Post'/>
          <StandardButton title='Delete' onClick={OnDelete} />
        </div>
      </div>
      
    </div>
  )
}
const mapStateToProps = state => ({
  userData: state.user.userData,
});
export default connect(mapStateToProps)(EditProjectPostPage)