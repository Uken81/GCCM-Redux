import React, { useState } from 'react';

import '../../Pages/LogInPage/LogIn.styles.scss';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, google } from '../Firebase/firebase.utils';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AlertTypes } from './SignIn/LogInAlert';

interface Props {
  setShowLoadingScreen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertType: React.Dispatch<React.SetStateAction<AlertTypes>>;
}

const SignUp = ({ setShowLoadingScreen, setAlertType }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const navigate = useNavigate();
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const isConfirmed = password === confirmPassword;
    if (!isConfirmed) {
      setAlertType('invalidPasswordConfirm');
      resetForm();
      return;
    }

    try {
      setShowLoadingScreen(true);
      await createUserWithEmailAndPassword(auth, email, password);
      resetForm();

      navigate('/create-or-manage-page');
    } catch (error) {
      const errorCode = error.code;
      console.error('error code: ', errorCode);

      if (errorCode === 'auth/email-already-in-use') {
        setAlertType('duplicateEmail');
      }

      if (errorCode === 'auth/invalid-email') {
        setAlertType('invalidEmail');
      }

      if (errorCode === 'auth/weak-password') {
        setAlertType('weakPassword');
      }
      setShowLoadingScreen(false);
      resetForm();
    }
    return () => {
      setShowLoadingScreen(false);
    };
  };

  const googleSignUp = async () => {
    await google();
    navigate('/create-or-manage-page');
  };

  return (
    <div className="sign-up">
      <Button variant="primary" onClick={googleSignUp}>
        SIGN UP WITH GOOGLE
      </Button>
      <span>or</span>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-input" controlId="sign-up-email">
          <Form.Control
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-input" controlId="sign-up-password">
          <Form.Control
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-input" controlId="confirm-password">
          <Form.Control
            type="password"
            name="confirm-password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          SIGN UP
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
