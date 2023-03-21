import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import { useAppDispatch } from 'features/reduxHooks';
import { resetCharacter } from 'features/characterSlice';

export const BackToSignIn = () => {
  return (
    <div className="nav-link">
      <Link to="/sign-in-and-sign-up">SIGN IN</Link>
    </div>
  );
};

export const BackToLandingPage = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="nav-link" data-testid="test">
      <Link to="/" onClick={() => dispatch(resetCharacter())}>
        BACK
      </Link>
    </div>
  );
};

export const BackToCreateManage = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="nav-link">
      <Link to="/create-or-manage-page" onClick={() => dispatch(resetCharacter())}>
        BACK
      </Link>
    </div>
  );
};

export const ToEditCharacter = () => {
  return (
    <div className="button-container">
      <Button className="tool-button">
        <Link to="/edit-character-page" style={{ color: 'black', textDecoration: 'none' }}>
          Edit Character
        </Link>
      </Button>
    </div>
  );
};
