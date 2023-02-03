import { screen } from '@testing-library/react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import SignInAndSignUp from 'Pages/SignInAndSignUp/SignInAndSignUpPage';
import React from 'react';
import { initialUserValue } from 'utils/mockContextProvider';
import { setupWithUserEvents } from 'utils/test-utils';

jest.mock('firebase/auth');
const mockedGoogleSignin = signInWithPopup as jest.MockedFunction<typeof signInWithPopup>;
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
  const clickGoogleSignIn = () =>
    utils.userAction.click(screen.getByRole('button', { name: 'SIGN IN WITH GOOGLE' }));
  const changeEmailInput = (value: string) => utils.userAction.type(emailInputNode, value);
  const changePasswordInput = (value: string) => utils.userAction.type(passwordInputNode, value);

  return {
    ...utils,
    click,
    emailInputNode,
    passwordInputNode,
    clickSubmit,
    clickGoogleSignIn,
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

test('if the email and password are submitted correctly', async () => {
  mockedSignin.mockResolvedValue({
    user: initialUserValue,
    providerId: '',
    operationType: 'signIn'
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

test('if signing in with the wrong email causes the correct alert to display', async () => {
  mockedSignin.mockRejectedValue({
    error: {
      message: 'Firebase: Error (auth/user-not-found).'
    }
  });

  const { changeEmailInput, changePasswordInput, clickSubmit } = setupTest();

  const email = 'user@emai';
  const password = 'password1234';

  await changeEmailInput(email);
  await changePasswordInput(password);
  await clickSubmit();
  expect(await screen.findByRole('alert')).toBeInTheDocument();
});

test('if clicking on sign in with google calls the correct function', async () => {
  mockedGoogleSignin.mockResolvedValue({
    user: initialUserValue,
    providerId: '',
    operationType: 'signIn'
  });
  const { clickGoogleSignIn } = setupTest();

  await clickGoogleSignIn();
  expect(mockedGoogleSignin).toHaveBeenCalled();
});
