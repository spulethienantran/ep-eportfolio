import React, { useState } from 'react';
import Logo from '../../Components/Logo/Logo';
import StandardTextInputField from '../../Components/InputFields/StandardTextInputField';
import StandardTextButton from '../../Components/Buttons/StandardTextButton/StandardTextButton';
import StandardButton from '../../Components/Buttons/StandardButton/StandardButton';

import './SignUpPage.css';
import { useNavigate } from 'react-router-dom';

import { API } from '../../Constants';
import axios from 'axios';

function SignUpPage() {

  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState('');

  const [userInformation, setUserInformation] = useState ({
    userEmail: '',
    fullname: '',
    school: '',
    major: '',
    username: '',
    password: '',
  });

  const requestBody = {
    userEmail: userInformation.userEmail,
    fullname: userInformation.fullname,
    school: userInformation.school,
    major: userInformation.major,
    username: userInformation.username,
    password: userInformation.password,
  };

  const HandleInputChange = (propertyName, inputValue) => {
    if (isError) {
      setIsError(false);
    }
    setUserInformation({...userInformation, [propertyName]: inputValue});
  }

  const OnSignUp = () => {
    if(IsValid()) {
      axios
        .post(API.signUpURL, requestBody, {
          headers: {
            'X-API-KEY': API.key,
          },
        })
        .then(response => {
          navigate('/');
        })
        .catch(error => {
          setIsError(true);
          setErrorMessage(error.response.data.message);
        })
    }
  }

  const IsValid = () => {
    if (!userInformation.userEmail || !userInformation.fullname || !userInformation.school || !userInformation.major || !userInformation.username || !userInformation.password) {
      setIsError(true);
      setErrorMessage('All fields are required.')
      return false;
    }
    if (userInformation.password.length < 6) {
      setIsError(true);
      setErrorMessage('Password must be 6 characters long or more.');
      return false;
    }
    setErrorMessage('');
    return true;
  }

  return (
    <div className='wrapper SignUpPage-Wrapper'>
      <div className='SignUpPage-FormContainer'>
        <Logo className='SignUpPage-Logo'/>
        <div className='SignUpPage-HeadlineContainer'>
          <p className='paragraph-2'>Sign up to showcase and catch up with other projects by your peers!</p>
          {isError && (
          <>
            <p className='paragraph-2 SignUpPage-ErrorMessage'>{errorMessage}</p>
          </>
        )}
        </div>
        <div className='SignUpPage-InputFieldsContainer'>
          <StandardTextInputField placeholder='Email Address' 
                                  type='email'
                                  name='userEmail'
                                  onChange={HandleInputChange} />
          <StandardTextInputField placeholder='Full Name'
                                  name='fullname'
                                  onChange={HandleInputChange} />
          <StandardTextInputField placeholder='School/University'
                                  name='school' 
                                  onChange={HandleInputChange} />
          <StandardTextInputField placeholder='Major'
                                  name='major' 
                                  onChange={HandleInputChange}/>
          <StandardTextInputField placeholder='Username'
                                  name='username'
                                  onChange={HandleInputChange} />
          <StandardTextInputField placeholder='Password'
                                  type='password'
                                  name='password'
                                  onChange={HandleInputChange}/>
        </div>
        <div className='SignUpPage-PromptContainer'>
          <p className='paragraph-2'>Already have an account?</p>
          <StandardTextButton text='Sign In' onClick={() => {navigate('/')}}/>
        </div>
        <StandardButton title='Sign Up' onClick={OnSignUp}/>
      </div>
    </div>
  )
}

export default SignUpPage