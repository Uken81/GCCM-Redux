import React from 'react';
import { SetStateAction, useState } from 'react';

import '../../Pages/SignInAndSignUp/SignInAndSignUpPage.styles.scss';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, google } from '../Firebase/firebase.utils';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Props {
  setShowLoadingScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp = ({ setShowLoadingScreen }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e: { target: { name: string; value: SetStateAction<string> } }) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }

    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }

    if (e.target.name === 'confirm-password') {
      setConfirmPassword(e.target.value);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const navigate = useNavigate();
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      resetForm();
      return;
    }

    try {
      setShowLoadingScreen(true);
      await createUserWithEmailAndPassword(auth, email, password);
      resetForm();

      navigate('/create-or-manage-page');
    } catch (error) {
      console.error('error code: ', error.code);
      const errorCode = error.code;

      if (errorCode === 'auth/email-already-in-use') {
        alert('An account using this email already exists');
      }

      if (errorCode === 'auth/invalid-email') {
        alert('The provided Email is invalid');
      }

      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak');
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
        <Form.Group className="sign-up-form" controlId="sign-up-email">
          <Form.Control
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="sign-up-form" controlId="sign-up-password">
          <Form.Control
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </Form.Group>

        <Form.Group className="sign-up-form" controlId="confirm-password">
          <Form.Control
            type="password"
            name="confirm-password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={handleChange}
            onSubmit={handleSubmit}
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
