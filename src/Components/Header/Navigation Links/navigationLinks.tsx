import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export const BackToSignIn = () => (
  <div className="nav-link">
    <Link to="/sign-in-and-sign-up">SIGN IN</Link>
  </div>
);

export const BackToLandingPage = () => (
  <div className="nav-link" data-testid="test">
    <Link to="/">BACK</Link>
  </div>
);

export const BackToCreateManage = () => (
  <div className="nav-link">
    <Link to="/create-or-manage-page">BACK</Link>
  </div>
);

export const ToEditCharacter = () => (
  <Link style={{ width: '100%' }} to="/edit-character-page">
    <Button style={{ width: '100%' }} size="lg" variant="outline-primary">
      Edit Character
    </Button>
  </Link>
);
