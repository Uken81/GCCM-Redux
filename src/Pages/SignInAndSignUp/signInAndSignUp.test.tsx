import React from 'react';
import SignInAndSignUp from './SignInAndSignUpPage';
import { screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/testSetup';

function setupTest() {
  const utils = renderWithProviders(<SignInAndSignUp />);
  return {
    ...utils
  };
}

test('if clicking on the sign in with google button renders the loading page', async () => {
  const { user } = setupTest();

  await user.click(screen.getByRole('button', { name: 'SIGN IN WITH GOOGLE' }));
  expect(await screen.findByText('LOADING....')).toBeInTheDocument();
});

test('if clicking on the sign in button renders the loading page', async () => {
  const { user } = setupTest();

  await user.click(screen.getByRole('button', { name: 'SIGN IN' }));
  expect(await screen.findByText('LOADING....')).toBeInTheDocument();
});
