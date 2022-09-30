import React from 'react';
import { useState } from 'react';

import '../../Pages/SignInAndSignUp/SignInAndSignUpPage.styles.scss';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { google } from '../Firebase/firebase.utils';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Props {
  setIsSigningIn: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLoadingScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn = ({ setIsSigningIn, setShowLoadingScreen }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setShowLoadingScreen(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('****signin');
        navigate('/create-or-manage-page');
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log('error code: ', errorCode);
        if (errorCode === 'auth/user-not-found') {
          alert('The email you have entered has not been found.');
        }

        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password entered for this account.');
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
        alert('Google sign in is not working. Sign in with email and password or try again later.');
        setShowLoadingScreen(false);
      });
    return () => {
      setShowLoadingScreen(false);
    };
  };

  const redirectToSignup = () => {
    setIsSigningIn(false);
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
      <Form onSubmit={handleSubmit}>
        <Form.Group className="sign-in-form" controlId="sign-in-email">
          <Form.Control
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="sign-in-form" controlId="sign-in-password">
          <Form.Control
            type="password"
            name="password"
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
      <div className="redirect-sign-up">
        <p className="redirect-link" onClick={redirectToSignup}>
          Sign Up
        </p>
        <p>if you dont have an account yet</p>
      </div>
    </div>
  );
};

export default SignIn;
