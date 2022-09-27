import React from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useCharacterStore } from '../../Global State/store';

interface Props {
  setShowSaveAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const SuccessfulSaveAlert = ({ setShowSaveAlert }: Props) => {
  const characterName = useCharacterStore((state) => state.character.name);

  return (
    <div className="successful-save-alert">
      <Alert variant="success">
        <Alert.Heading>{`${characterName} has been succesfully saved.`}</Alert.Heading>
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowSaveAlert(false)}>Continue</Button>
        </div>
      </Alert>
    </div>
  );
};

export default SuccessfulSaveAlert;
