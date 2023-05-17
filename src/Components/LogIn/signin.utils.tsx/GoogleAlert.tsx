import React from 'react';
import { Alert } from 'react-bootstrap';

interface Props {
  setShowGoogleAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GoogleAlert = ({ setShowGoogleAlert }: Props) => {
  return (
    <Alert variant="warning" onClose={() => setShowGoogleAlert(false)} dismissible>
      Google sign in is not working. Sign in with email and password or try again later.
    </Alert>
  );
};
