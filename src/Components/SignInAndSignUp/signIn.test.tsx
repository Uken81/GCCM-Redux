import { screen } from '@testing-library/react';
import { google } from 'Components/Firebase/firebase.utils';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import SignInAndSignUp from 'Pages/SignInAndSignUp/SignInAndSignUpPage';
import React from 'react';
import { setupWithUserEvents } from 'utils/test-utils';

jest.mock('firebase/auth');
const mockedGoogleSignin = google as jest.MockedFunction<typeof google>;
jest.mock('firebase/auth');
const mockedSignin = signInWithEmailAndPassword as jest.MockedFunction<
  typeof signInWithEmailAndPassword
>;

function setupTest() {
  const utils = setupWithUserEvents(
    <div>
      <SignInAndSignUp />
    </div>
  );

  const click = utils.userAction.click;

  const emailInputNode = screen.getByLabelText(/email/i);
  const passwordInputNode = screen.getByLabelText(/password/i);

  const clickSubmit = () => utils.userAction.click(screen.getByRole('button', { name: 'SIGN IN' }));
  const changeEmailInput = (value: string) => utils.userAction.type(emailInputNode, value);
  const changePasswordInput = (value: string) => utils.userAction.type(passwordInputNode, value);

  return {
    ...utils,
    click,
    emailInputNode,
    passwordInputNode,
    clickSubmit,
    changeEmailInput,
    changePasswordInput
  };
}

test('if email input has the correct placeholder text', () => {
  const { emailInputNode } = setupTest();

  expect(emailInputNode).toHaveAttribute('placeholder', 'Email');
});

test('if password input has the correct placeholder text', () => {
  const { passwordInputNode } = setupTest();

  expect(passwordInputNode).toHaveAttribute('placeholder', 'Password');
});

// test.only('if clicking on the sign in with google button renders the loading page', async () => {
//   const { click } = setupTest();
//   screen.debug();
//   const googleButton = screen.getByRole('button', { name: 'SIGN IN WITH GOOGLE' });
//   await click(googleButton);
//   expect(screen.getByText('LOADING....')).toBeInTheDocument();
//   screen.debug();
// });

test('if the email and password are submitted correctly', async () => {
  mockedSignin.mockResolvedValue({
    kind: 'identitytoolkit#VerifyPasswordResponse',
    localId: 'r9Pn67nFQ7ZHizKjqt285VMKb5R2',
    email: '',
    displayName: '',
    idToken: '',
    registered: true,
    refreshToken: '',
    expiresIn: '3600'
  });

  const { changeEmailInput, changePasswordInput, clickSubmit } = setupTest();

  const auth = getAuth();
  const email = 'user@email.com';
  const password = 'password1234';

  await changeEmailInput(email);
  await changePasswordInput(password);
  await clickSubmit();

  expect(mockedSignin).toHaveBeenCalledWith(auth, 'user@email.com', 'password1234');
});

// test('if signing in with the wrong email causes the correct alert to display', async () => {
//   mockedSignin.mockRejectedValue({
//     error: {
//       code: 400,
//       message: 'auth/user-not-found',
//       errors: [
//         {
//           message: 'EMAIL_NOT_FOUND',
//           domain: 'global',
//           reason: 'invalid'
//         }
//       ]
//     }
//   });

//   const { changeEmailInput, changePasswordInput, clickSubmit } = setupTest();

//   const email = 'user@emai';
//   const password = 'password1234';

//   await changeEmailInput(email);
//   await changePasswordInput(password);
//   await clickSubmit();
//   screen.debug();
//   expect(mockedSignin).toHaveBeenCalled();
//   //   expect(screen.getByTestId('email-alert')).toBeInTheDocument();
//   expect(
//     await screen.findByText('The email you have entered has not been found.')
//   ).toBeInTheDocument();
// });
