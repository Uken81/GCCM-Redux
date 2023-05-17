import React from 'react';
import { useAppSelector } from 'features/reduxHooks';
import { Alert as BaseAlert } from 'react-bootstrap';

export const SaveAlert: React.FC<{
  alertType: string;
  setAlertType: React.Dispatch<React.SetStateAction<string>>;
}> = ({ alertType, setAlertType }) => {
  const characterName = useAppSelector((state) => state.character.name);

  const alerts = {
    success: {
      variant: 'success',
      msg: `${characterName} has been succesfully saved.`
    },
    attributesError: {
      variant: 'warning',
      msg: 'You must select at least one Advantage or Disadvantage.'
    },
    duplicate: {
      variant: 'warning',
      msg: 'You already have a character with this name. Delete original character or change name.'
    },
    nameError: {
      variant: 'warning',
      msg: 'You must type a name for your character and press enter in order to save.'
    },
    saveError: {
      variant: 'warning',
      msg: 'Failed to save to database, please try again later.'
    }
  };

  const alert = alerts[alertType];
  const Alert = (props: { variant: string; text: string }) => (
    <div className="save-alert">
      <BaseAlert variant={props.variant} onClose={() => setAlertType('')} dismissible>
        <BaseAlert.Heading>{props.text}</BaseAlert.Heading>
      </BaseAlert>
    </div>
  );

  return alert ? <Alert variant={alert.variant} text={alert.msg} /> : null;
};
