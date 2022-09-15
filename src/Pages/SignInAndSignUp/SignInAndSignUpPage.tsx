import React from 'react';
import './SignInAndSignUpPage.styles.scss';

import Header from '../../Components/Header/Header.component';
import { useState } from 'react';
import SignIn from 'Components/SignInAndSignUp/SignIn/sign-in-component';
import SignUp from 'Components/SignInAndSignUp/SignUp/sign-up-component';

const SignInAndSignUp = () => {
  const [isSigningIn, setIsSigningin] = useState(true);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  if (!showLoadingScreen) {
    return (
      <div className="sign-in-and-sign-up">
        <Header />
        <div className="form-container">
          <h1 className="main-title"> G.C.C.M </h1>
          {isSigningIn ? (
            <SignIn setIsSigningIn={setIsSigningin} setShowLoadingScreen={setShowLoadingScreen} />
          ) : (
            <SignUp setShowLoadingScreen={setShowLoadingScreen} />
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

export default SignInAndSignUp;
