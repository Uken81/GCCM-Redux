import { useCharacterStore } from 'Global State/store';
import React from 'react';
import Button from 'react-bootstrap/Button';

const ResetCharacter = () => {
  const resetSelect = useCharacterStore((state) => state.resetSelectedOptions);
  const resetCharacter = useCharacterStore((state) => state.resetCharacter);

  const reset = () => {
    resetSelect();
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
