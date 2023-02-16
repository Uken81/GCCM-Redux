import React, { useState } from 'react';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { google } from 'Components/Firebase/firebase.utils';
import { GoogleAlert } from '../signin.utils.tsx/GoogleAlert';

interface Props {
  setIsSigningIn: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLoadingScreen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEmailAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPasswordAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn = ({
  setIsSigningIn,
  setShowLoadingScreen,
  setShowEmailAlert,
  setShowPasswordAlert
}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showGoogleAlert, setShowGoogleAlert] = useState(false);

  const handleChange = (e: { target: { name: string; value: React.SetStateAction<string> } }) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }

    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setShowLoadingScreen(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/create-or-manage-page');
      })
      .catch((error) => {
        const errorCode = error.message;

        if (errorCode === 'Firebase: Error (auth/user-not-found).') {
          console.log('email', errorCode);
          setShowEmailAlert(true);
        }

        if (errorCode === 'Firebase: Error (auth/wrong-password).') {
          console.log('password', errorCode);
          setShowPasswordAlert(true);
        }
        setShowLoadingScreen(false);
      });
    return () => {
      setShowLoadingScreen(false);
    };
  };

  const googleSignIn = async () => {
    setShowLoadingScreen(true);

    await google()
      .then(() => {
        navigate('/create-or-manage-page');
      })
      .catch(() => {
        setShowLoadingScreen(false);
        setShowGoogleAlert(true);
      });
    return () => {
      setShowLoadingScreen(false);
    };
  };

  const toResetPasswordPage = () => {
    navigate('/reset-password-page');
  };

  return (
    <div className="sign-in">
      <Button variant="primary" onClick={googleSignIn}>
        SIGN IN WITH GOOGLE
      </Button>
      {showGoogleAlert && <GoogleAlert setShowGoogleAlert={setShowGoogleAlert} />}
      <span>or</span>
      <Form onSubmit={handleSignin}>
        <Form.Group className="sign-in-form" controlId="sign-in-email">
          <Form.Control
            type="email"
            name="email"
            aria-label="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="sign-in-form" controlId="sign-in-password">
          <Form.Control
            type="password"
            name="password"
            aria-label="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Group>

        <p className="reset-password" onClick={toResetPasswordPage}>
          Forgot your password?
        </p>

        <Button variant="primary" type="submit">
          SIGN IN
        </Button>
      </Form>
    </div>
  );
};

export default SignIn;
