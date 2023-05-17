import React from 'react';
import SignInAndSignUp from './LogInPage';
import { screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/testSetup';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { initialUserValue } from 'utils/mockContextProvider';

jest.mock('firebase/auth');
const mockedGoogleSignin = signInWithPopup as jest.MockedFunction<typeof signInWithPopup>;
const mockedSignin = signInWithEmailAndPassword as jest.MockedFunction<
  typeof signInWithEmailAndPassword
>;

function setupTest() {
  const utils = renderWithProviders(<SignInAndSignUp />);
  return {
    ...utils
  };
}

test('if clicking on the sign in with google button renders the loading page', async () => {
  mockedGoogleSignin.mockResolvedValue({
    user: initialUserValue,
    providerId: '',
    operationType: 'signIn'
  });

  const { user } = setupTest();

  await user.click(screen.getByRole('button', { name: 'SIGN IN WITH GOOGLE' }));
  expect(screen.getByText('LOADING....')).toBeInTheDocument();
});

test('if clicking on the sign in button renders the loading page', async () => {
  mockedSignin.mockResolvedValue({
    user: initialUserValue,
    providerId: '',
    operationType: 'signIn'
  });

  const { user } = setupTest();

  await user.click(screen.getByRole('button', { name: 'SIGN IN' }));
  expect(screen.getByText('LOADING....')).toBeInTheDocument();
});

test('if signing in with the wrong email causes the correct alert to display', async () => {
  const error = {
    message: 'Firebase: Error (auth/user-not-found).'
  };
  mockedSignin.mockRejectedValue(error);

  const { user } = setupTest();

  await user.click(screen.getByRole('button', { name: 'SIGN IN' }));
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'The email you have entered has not been found.'
  );
});

test('if signing in with the wrong password causes the correct alert to display', async () => {
  const error = {
    message: 'Firebase: Error (auth/wrong-password).'
  };
  mockedSignin.mockRejectedValue(error);

  const { user } = setupTest();

  await user.click(screen.getByRole('button', { name: 'SIGN IN' }));
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Wrong password entered for this account.'
  );
});

test('if clicking on the signup link displays the correct component', async () => {
  const { user } = setupTest();

  expect(screen.getByRole('button', { name: 'SIGN IN' })).toBeInTheDocument();

  await user.click(screen.getByText('Sign Up'));
  expect(screen.getByRole('button', { name: 'SIGN UP' })).toBeInTheDocument();
});
