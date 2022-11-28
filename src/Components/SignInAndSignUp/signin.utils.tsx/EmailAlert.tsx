import React from 'react';
import { Alert } from 'react-bootstrap';

interface Props {
  setShowEmailAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EmailAlert = ({ setShowEmailAlert }: Props) => {
  return (
    <Alert variant="warning" onClose={() => setShowEmailAlert(false)} dismissible>
      The email you have entered has not been found.
    </Alert>
  );
};
