import React, { useState } from 'react';
import { useAppSelector } from 'features/reduxHooks';
import { Alert } from 'react-bootstrap';

export const DisplayAlert: React.FC<{ alertType: string }> = ({ alertType }) => {
  const characterName = useAppSelector((state) => state.character.name);
  const nameText = characterName;
  const [show, setShow] = useState(true);

  const createAlert = (variant: string, text: string) => {
    if (show) {
      return (
        <div className="save-alert">
          <Alert variant={variant} onClose={() => setShow(false)} dismissible>
            <Alert.Heading>{text}</Alert.Heading>
            <div className="d-flex justify-content-end"></div>
          </Alert>
        </div>
      );
    } else return;
  };
  //check below
  const alert = alertType;
  let saveAlert: JSX.Element | undefined;
  switch (alert) {
    case 'success':
      saveAlert = createAlert('success', `${nameText} has been succesfully saved.`);
      break;
    case 'no-attributes':
      saveAlert = createAlert('warning', 'You must select at least one Advantage or Disadvantage.');
      break;
    case 'duplicate':
      saveAlert = createAlert(
        'warning',
        'You already have a character with this name. Delete original character or change name.'
      );
      break;
    case 'no-name':
      saveAlert = createAlert(
        'warning',
        'You must type a name for your character and press enter in order to save.'
      );
      break;
    case 'save-error':
      saveAlert = createAlert('warning', 'Failed to save to database, please try again later.');
  }

  return <>{saveAlert}</>;
};
