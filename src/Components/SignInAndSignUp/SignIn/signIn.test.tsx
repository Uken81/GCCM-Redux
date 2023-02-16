import React from 'react';
import { screen } from '@testing-library/react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import SignInAndSignUp from 'Pages/SignInAndSignUp/SignInAndSignUpPage';
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

describe('if input has the correct placeholder text', () => {
  test('email', () => {
    setupTest();

    expect(screen.getByLabelText('email')).toHaveAttribute('placeholder', 'Email');
  });

  test('password', () => {
    setupTest();

    expect(screen.getByLabelText('password')).toHaveAttribute('placeholder', 'Password');
  });
});

test('if the email and password are correctly submitted to the sign in with email and password function', async () => {
  mockedSignin.mockResolvedValue({
    user: initialUserValue,
    providerId: '',
    operationType: 'signIn'
  });

  const { user } = setupTest();
  const auth = getAuth();
  const email = 'user@email.com';
  const password = 'password1234';

  await user.clear(screen.getByLabelText('email'));
  await user.type(screen.getByLabelText('email'), email);
  await user.clear(screen.getByLabelText('password'));
  await user.type(screen.getByLabelText('password'), password);
  await user.click(screen.getByRole('button', { name: 'SIGN IN' }));

  expect(mockedSignin).toHaveBeenCalledWith(auth, 'user@email.com', 'password1234');
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
