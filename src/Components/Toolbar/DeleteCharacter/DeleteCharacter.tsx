import { useAppSelector } from 'features/reduxHooks';
import React from 'react';

import Button from 'react-bootstrap/Button';

const DeleteCharacter: React.FC<{ handleClick: () => void }> = ({ handleClick }) => {
  const characterName = useAppSelector((state) => state.character.name);

  return (
    <Button
      onClick={handleClick}
      size="lg"
      variant="outline-primary">{`Delete ${characterName}`}</Button>
  );
};

export default DeleteCharacter;
