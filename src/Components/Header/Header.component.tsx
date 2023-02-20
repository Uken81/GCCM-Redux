import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase.utils';
import { BackToCreateManage, BackToLandingPage } from './Navigation Links/navigationLinks';

import './header.styles.scss';

import { useLocation } from 'react-router';
import { UserContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const Header = () => {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  const signout = () => {
    signOut(auth)
      .then(() => {
        console.log(user?.email + ' signed out');
        navigate('/');
      })
      .catch((error) => {
        console.log('error signing out user', error.message);
        Alert(error.message);
      });
  };

  return (
    <div className="header">
      {['/sign-in-and-sign-up', '/guest-page'].includes(pathname) && <BackToLandingPage />}
      {['/create-new-character-page', '/manage-characters-page', '/edit-character-page'].includes(
        pathname
      ) && <BackToCreateManage />}
      {user && <button id="sign-out" onClick={signout}></button>}
    </div>
  );
};

export default Header;
