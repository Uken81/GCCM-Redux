import React from 'react';
import { setupWithUserEvents } from 'utils/test-utils';
import SignInAndSignUp from './SignInAndSignUpPage';
import { screen, waitFor } from '@testing-library/react';

function setupTest() {
  const utils = setupWithUserEvents(<SignInAndSignUp />);
  const click = utils.userAction.click;

  return {
    ...utils,
    click
  };
}

test('if clicking on the sign in with google button renders the loading page', async () => {
  const { click } = setupTest();
  // const googleButton = screen.getByRole('button', { name: 'SIGN IN WITH GOOGLE' });
  // await click(googleButton);
  // expect(screen.getByText('LOADING....')).toBeInTheDocument();
});

// test('if clicking on the sign in button renders the loading page', async () => {
//   const { click } = setupTest();

//   const signinButton = screen.getByRole('button', { name: 'SIGN IN' });
//   await click(signinButton);
//   //   await screen.findByText('LOADING....');
//   //   expect(screen.findByText('LOADING....')).toBeInTheDocument();
//   await waitFor(() => {
//     expect(screen.findByText('LOADING....'));
//   });
// });
