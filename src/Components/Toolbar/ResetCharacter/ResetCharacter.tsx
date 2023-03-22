import React from 'react';
import Button from 'react-bootstrap/Button';
import { useAppDispatch } from 'features/reduxHooks';
import { resetCharacter } from 'features/characterSlice';

const ResetCharacter = () => {
  const dispatch = useAppDispatch();

  return (
    <Button size="lg" variant="outline-primary" onClick={() => dispatch(resetCharacter())}>
      Reset Character
    </Button>
  );
};

export default ResetCharacter;
