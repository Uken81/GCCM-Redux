import React from 'react';
import { Alert as BaseAlert } from 'react-bootstrap';

export type AlertTypes =
  | ''
  | 'unknownEmail'
  | 'duplicateEmail'
  | 'invalidEmail'
  | 'wrongPassword'
  | 'weakPassword'
  | 'invalidPasswordConfirm'
  | 'google';

export const LogInAlert: React.FC<{
  alertType: string;
  setAlertType: React.Dispatch<React.SetStateAction<string>>;
}> = ({ alertType, setAlertType }) => {
  const alerts = {
    unknownEmail: {
      variant: 'warning',
      message: 'The email you have entered has not been found.'
    },
    duplicateEmail: {
      variant: 'warning',
      message: 'An account using this email already exists.'
    },
    invalidEmail: {
      variant: 'warning',
      message: 'The provided Email is invalid.'
    },
    wrongPassword: {
      variant: 'warning',
      message: 'Wrong password entered for this account.'
    },
    weakPassword: {
      variant: 'warning',
      message: 'The password is too weak.'
    },
    invalidPasswordConfirm: {
      variant: 'warning',
      message: 'passwords dont match'
    },
    google: {
      variant: 'warning',
      message: 'Google sign in is not working. Sign in with email and password or try again later.'
    }
  };

  const alert = alerts[alertType];
  const Alert = (props: { variant: string; message: string }) => (
    <BaseAlert variant={props.variant} onClose={() => setAlertType('')} dismissible>
      <BaseAlert.Heading>{props.message}</BaseAlert.Heading>
    </BaseAlert>
  );

  return alert ? <Alert variant={alert.variant} message={alert.message} /> : null;
};
