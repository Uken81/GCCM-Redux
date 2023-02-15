import { useAppSelector } from 'features/reduxHooks';
import React from 'react';

import Button from 'react-bootstrap/Button';

interface Props {
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteCharacter = ({ setShowAlert }: Props) => {
  const characterName = useAppSelector((state) => state.character.name);

  const showDeleteAlert = () => {
    setShowAlert(true);
  };

  return (
    <div className="button-container">
      <Button className="tool-button" onClick={showDeleteAlert}>
        {`Delete ${characterName}`}
      </Button>
    </div>
  );
};

export default DeleteCharacter;
