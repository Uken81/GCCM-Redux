import React from 'react';
import Button from 'react-bootstrap/Button';
import { useCharacterStore } from 'Global State/store';
import { useAppDispatch } from 'Components/CustomHooks/reduxHooks';
import { resetSelectedOptions } from 'features/selectedOptionsSlice';

const ResetCharacter = () => {
  const dispatch = useAppDispatch();

  const resetCharacter = useCharacterStore((state) => state.resetCharacter);

  const reset = () => {
    dispatch(resetSelectedOptions());
    resetCharacter();
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
