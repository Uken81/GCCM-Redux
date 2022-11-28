import React from 'react';
import { Alert } from 'react-bootstrap';

interface Props {
  setShowPasswordAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PasswordAlert = ({ setShowPasswordAlert }: Props) => {
  return (
    <Alert variant="warning" onClose={() => setShowPasswordAlert(false)} dismissible>
      Wrong password entered for this account.
    </Alert>
  );
};
