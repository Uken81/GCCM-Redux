import React, { useState } from 'react';
import './SignInAndSignUpPage.styles.scss';

import Header from '../../Components/Header/Header.component';
import SignIn from '../../Components/SignInAndSignUp/SignIn/SignIn';
import SignUp from '../../Components/SignInAndSignUp/SignUp';
import { EmailAlert } from 'Components/SignInAndSignUp/signin.utils.tsx/EmailAlert';
import { PasswordAlert } from 'Components/SignInAndSignUp/signin.utils.tsx/PasswordAlert';

const SignInAndSignUp = () => {
  const [isSigningIn, setIsSigningin] = useState(true);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);

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
          {showEmailAlert && <EmailAlert setShowEmailAlert={setShowEmailAlert} />}
          {showPasswordAlert && <PasswordAlert setShowPasswordAlert={setShowPasswordAlert} />}
          {isSigningIn ? (
            <>
              <SignIn
                setShowLoadingScreen={setShowLoadingScreen}
                setShowEmailAlert={setShowEmailAlert}
                setShowPasswordAlert={setShowPasswordAlert}
              />
              {redirectLink}
            </>
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
