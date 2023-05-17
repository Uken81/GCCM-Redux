import React, { useState } from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { auth, google } from 'Components/Firebase/firebase.utils';
import { AlertTypes } from './LogInAlert';

interface Props {
  setShowLoadingScreen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertType: React.Dispatch<React.SetStateAction<AlertTypes>>;
}

const SignIn = ({ setShowLoadingScreen, setAlertType }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const emailSignin = async (event: { preventDefault: () => void }) => {
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
          setAlertType('unknownEmail');
        }

        if (errorCode === 'Firebase: Error (auth/wrong-password).') {
          console.log('password', errorCode);
          setAlertType('wrongPassword');
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
        setAlertType('google');
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
      <span>or</span>
      <Form onSubmit={emailSignin}>
        <Form.Group className="form-input" controlId="sign-in-email">
          <Form.Control
            type="email"
            name="email"
            aria-label="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-input" controlId="sign-in-password">
          <Form.Control
            type="password"
            name="password"
            aria-label="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
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
