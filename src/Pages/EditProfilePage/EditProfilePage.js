import React, { useRef, useState } from 'react';

import './EditProfilePage.css';
import NavBar from '../../Components/NavBar/NavBar';
import ProfileAvatar from '../../Components/ProfileAvatar/ProfileAvatar';
import StandardTextInputField from '../../Components/InputFields/StandardTextInputField';
import StandardButton from '../../Components/Buttons/StandardButton/StandardButton';

import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import axios from 'axios';
import { API } from '../../Constants';
import { setUserData } from '../../storage';

function EditProfilePage({ userData }) {
  const fileInputRef = useRef(null);
  const [imageOGWidth, setImageOGWidth] = useState(null);
  const [imageOGHeight, setImageOGHeight] = useState(null);
  const [userAvatarBase64, setUserAvatarBase64] = useState(userData?.userImage?.photoEncode64);

  const maxWidth = 240; 
  const maxHeight = 240; 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isError, setIsError] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState('');

  //populate
  const [userInformation, setUserInformation] = useState ({
    encodePhoto: userAvatarBase64,
    photoOGHeight: null,
    photoOGWidth: null,
    fullname: userData.fullname,
    major: userData.major,
    school: userData.school,
    email: userData.email,

  });

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
        setUserInformation({ ...userInformation, encodePhoto: base64Data });
        setUserAvatarBase64(base64Data);

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
    setUserInformation({...userInformation, [propertyName]: inputValue});
  }

  const OnUpdate = () => {
    if (IsValid()) {
      const requestBody = {
        userId: userData.userId,
        encodePhoto: userInformation.encodePhoto,
        fullname: userInformation.fullname,
        major: userInformation.major,
        school: userInformation.school,
        email: userInformation.email,
        photoOGWidth: imageOGWidth,
        photoOGHeight: imageOGHeight,
      };
      console.log(requestBody);
      axios
        .put(API.editUserInformationURL, requestBody, {
          headers: {
            'X-API-KEY': API.key,
          },
        })
        .then(response => {
          const newUserData = {
            userId: userData.userId,
            fullname: requestBody.fullname,
            major: requestBody.major,
            school: requestBody.school,
            userImage: {
              photoEncode64: requestBody.encodePhoto,
            },
            email: requestBody.email,
            username: userData.username,
          }
          dispatch(setUserData(newUserData));
          navigate('/Profile');
        })
        .catch(error => {
          setIsError(true);
          setErrorMessage(error.response.data.message);
        })
    }
  }

  const IsValid = () => {
    if (!userInformation.fullname || !userInformation.major
      || !userInformation.school || !userInformation.email) {
      setIsError(true);
      setErrorMessage('All fields are required.');
      return false;
    }
    setErrorMessage('');
    return true;
  }

  return (
    <div className='wrapper EditProfilePage-Wrapper'>
      <NavBar />
      <div className='EditProfilePage-ContentContainer'>
        <div className='EditProfilePage-Content'>
          <p className='heading-1 EditProfilePage-Title'>Edit Profile</p>
          <div className='EditProfilePage-UserAvatarContainer'>
            <label className="EditProfilePage-UserAvatarContainer" onClick={OpenFileDialog}>
              <ProfileAvatar userClassName='EditProfilePage-UserAvatar' defaultClassName='EditProfilePage-DefaultUserAvatar' userAvatar={userAvatarBase64}/>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={HandleFileInputChange}
              />
            </label>
          </div>
          {isError && (
          <>
            <p className='paragraph-2 EditProfilePage-ErrorMessage'>{errorMessage}</p>
          </>
        )}
          <div className='EditProfilePage-EditForm'>
            <StandardTextInputField placeholder='Full Name'
                                    name='fullname'
                                    onChange={HandleInputChange}
                                    value={userInformation.fullname}/>
            <StandardTextInputField placeholder='Major'
                                    name='major'
                                    onChange={HandleInputChange}
                                    value={userInformation.major}/>
            <StandardTextInputField placeholder='School/University'
                                    name='school'
                                    onChange={HandleInputChange}
                                    value={userInformation.school}/>
            <StandardTextInputField placeholder='Email Address'
                                    name='email'
                                    onChange={HandleInputChange}
                                    value={userInformation.email}/>
          </div>

          <StandardButton title='Update' onClick={OnUpdate} className='EditProfilePage-Update'/>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  userData: state.user.userData,
});
export default connect(mapStateToProps)(EditProfilePage)