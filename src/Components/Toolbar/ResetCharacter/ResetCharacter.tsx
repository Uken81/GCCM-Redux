import React from 'react';
import Button from 'react-bootstrap/Button';
import { useAppDispatch } from 'features/reduxHooks';
import { resetCharacter } from 'features/characterSlice';

const ResetCharacter = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="button-container">
      <Button className="tool-button" size="lg" onClick={() => dispatch(resetCharacter())}>
        Reset Character
      </Button>
    </div>
  );
};

export default ResetCharacter;
