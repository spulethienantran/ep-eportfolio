import React, {lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const SignInPage = lazy(() => import('./Pages/SignInPage'));
const SignUpPage = lazy(() => import('./Pages/SignUpPage'));

const ProfilePage = lazy(() => import('./Pages/ProfilePage'));
const EditProfilePage = lazy(() => import('./Pages/EditProfilePage'));

const PostProjectPage = lazy(() => import('./Pages/PostProjectPage'));

const ProjectPostPage = lazy(() => import('./Pages/ProjectPostPage'));
const EditProjectPostPage = lazy(() => import('./Pages/EditProjectPostPage'));

function App() {

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/EditProfile" element={<EditProfilePage />} />
          <Route path="/PostProject" element={<PostProjectPage/>} />
          <Route path="/Project" element={<ProjectPostPage/>} />
          <Route path="/EditProject" element={<EditProjectPostPage/>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
