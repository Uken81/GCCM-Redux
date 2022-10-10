import React from 'react';
import Button from 'react-bootstrap/Button';
import { useAppDispatch } from 'Components/CustomHooks/reduxHooks';
import { resetSelectedOptions } from 'features/selectedOptionsSlice';
import { resetCharacter } from 'features/characterSlice';

const ResetCharacter = () => {
  const dispatch = useAppDispatch();

  const reset = () => {
    dispatch(resetSelectedOptions());
    dispatch(resetCharacter());
  };

  return (
    <div className="button-container">
      <Button className="tool-button" size="lg" onClick={reset}>
        Reset Character
      </Button>
    </div>
  );
};

export default ResetCharacter;
