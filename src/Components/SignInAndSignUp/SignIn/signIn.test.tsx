import { screen } from '@testing-library/react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import SignInAndSignUp from 'Pages/SignInAndSignUp/SignInAndSignUpPage';
import React from 'react';
import { initialUserValue } from 'utils/mockContextProvider';
import { renderWithProviders } from 'utils/testSetup';

jest.mock('firebase/auth');
const mockedGoogleSignin = signInWithPopup as jest.MockedFunction<typeof signInWithPopup>;
const mockedSignin = signInWithEmailAndPassword as jest.MockedFunction<
  typeof signInWithEmailAndPassword
>;

function setupTest() {
  const utils = renderWithProviders(
    <div>
      <SignInAndSignUp />
    </div>
  );
  return {
    ...utils
  };
}

test('if email input has the correct placeholder text', () => {
  setupTest();

  expect(screen.getByLabelText('email')).toHaveAttribute('placeholder', 'Email');
});

test('if password input has the correct placeholder text', () => {
  setupTest();

  expect(screen.getByLabelText('password')).toHaveAttribute('placeholder', 'Password');
});

test('if the email and password are submitted to the sign in with email and password function correctly', async () => {
  mockedSignin.mockResolvedValue({
    user: initialUserValue,
    providerId: '',
    operationType: 'signIn'
  });

  const { user } = setupTest();
  const auth = getAuth();
  const email = 'user@email.com';
  const password = 'password1234';

  await user.type(screen.getByLabelText('email'), email);
  await user.type(screen.getByLabelText('password'), password);
  await user.click(screen.getByRole('button', { name: 'SIGN IN' }));

  expect(mockedSignin).toHaveBeenCalledWith(auth, 'user@email.com', 'password1234');
});

test('if signing in with the wrong email causes the correct alert to display', async () => {
  mockedSignin.mockRejectedValue({
    error: {
      message: 'Firebase: Error (auth/user-not-found).'
    }
  });

  const { user } = setupTest();

  const email = 'user@emai';
  const password = 'password1234';

  await user.type(screen.getByLabelText('email'), email);
  await user.type(screen.getByLabelText('password'), password);
  await user.click(screen.getByRole('button', { name: 'SIGN IN' }));

  expect(await screen.findByRole('alert')).toBeInTheDocument();
});

test('if clicking on sign in with google calls the correct function', async () => {
  mockedGoogleSignin.mockResolvedValue({
    user: initialUserValue,
    providerId: '',
    operationType: 'signIn'
  });

  const { user } = setupTest();

  await user.click(screen.getByRole('button', { name: 'SIGN IN WITH GOOGLE' }));
  expect(mockedGoogleSignin).toHaveBeenCalled();
});
