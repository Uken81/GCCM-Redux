import React, { useState } from 'react';
import './LogIn.styles.scss';
import Header from '../../Components/Header/Header.component';
import SignIn from 'Components/LogIn/SignIn/SignIn';
import SignUp from 'Components/LogIn/SignUp';
import { AlertTypes, LogInAlert } from 'Components/LogIn/SignIn/LogInAlert';

const LogInPage = () => {
  const [isSigningIn, setIsSigningin] = useState(true);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [alertType, setAlertType] = useState<AlertTypes>('');

  const redirectLink = (
    <div className="redirect-sign-up">
      <p className="redirect-link" onClick={() => setIsSigningin(false)}>
        Sign Up
      </p>
      <p>if you dont already have an account</p>
    </div>
  );

  if (!showLoadingScreen) {
    return (
      <div className="sign-in-and-sign-up">
        <Header />
        <h1 className="main-title"> G.C.C.M </h1>
        <div className="form-container">
          <LogInAlert alertType={alertType} setAlertType={setAlertType} />
          {isSigningIn ? (
            <>
              <SignIn setShowLoadingScreen={setShowLoadingScreen} setAlertType={setAlertType} />
              {redirectLink}
            </>
          ) : (
            <SignUp setShowLoadingScreen={setShowLoadingScreen} setAlertType={setAlertType} />
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="sign-in-and-sign-up"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <h1 className="main-title"> G.C.C.M </h1>
        <p
          style={{
            fontSize: '2rem',
            color: 'white'
          }}>
          LOADING....
        </p>
      </div>
    );
  }
};

export default LogInPage;
