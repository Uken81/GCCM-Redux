import { useCharacterStore } from 'Global State/store';
import React from 'react';
import Button from 'react-bootstrap/Button';

const ResetCharacter = () => {
  const reset = useCharacterStore((state) => state.resetCharacter);

  return (
    <div className="button-container">
      <Button className="tool-button" size="lg" onClick={reset}>
        Reset Character
      </Button>
    </div>
  );
};

export default ResetCharacter;
