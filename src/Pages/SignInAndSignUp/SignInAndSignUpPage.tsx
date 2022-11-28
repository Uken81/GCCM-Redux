import React from 'react';
import './SignInAndSignUpPage.styles.scss';

import Header from '../../Components/Header/Header.component';
import { useState } from 'react';
import SignIn from '../../Components/SignInAndSignUp/SignIn';
import SignUp from '../../Components/SignInAndSignUp/SignUp';
import { EmailAlert } from 'Components/SignInAndSignUp/signin.utils.tsx/EmailAlert';
import { PasswordAlert } from 'Components/SignInAndSignUp/signin.utils.tsx/PasswordAlert';
// import { EmailAlert } from 'Components/SignInAndSignUp/signin.utils.tsx/EmailAlert';
// import { PasswordAlert } from 'Components/SignInAndSignUp/signin.utils.tsx/PasswordAlert';

const SignInAndSignUp = () => {
  const [isSigningIn, setIsSigningin] = useState(true);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);

  if (!showLoadingScreen) {
    return (
      <div className="sign-in-and-sign-up">
        <Header />
        <div className="form-container">
          <h1 className="main-title"> G.C.C.M </h1>

          {showEmailAlert && (
            <div data-testid="email-alert">
              <EmailAlert setShowEmailAlert={setShowEmailAlert} />
            </div>
          )}
          {showPasswordAlert && <PasswordAlert setShowPasswordAlert={setShowPasswordAlert} />}
          {isSigningIn ? (
            <SignIn
              setIsSigningIn={setIsSigningin}
              setShowLoadingScreen={setShowLoadingScreen}
              setShowEmailAlert={setShowEmailAlert}
              setShowPasswordAlert={setShowPasswordAlert}
            />
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
