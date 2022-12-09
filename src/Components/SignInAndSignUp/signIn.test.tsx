import { act, screen } from '@testing-library/react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import SignInAndSignUp from 'Pages/SignInAndSignUp/SignInAndSignUpPage';
import React from 'react';
import { setupWithUserEvents } from 'utils/test-utils';
import handleSubmit from './signin.utils.tsx/handleSubmit';

// jest.mock('./signin.utils.tsx/handleSubmit');
// const mockedHandleSubmit = handleSubmit as jest.MockedFunction<typeof handleSubmit>;
//test
jest.mock('firebase/auth');
const mockedSignin = signInWithEmailAndPassword as jest.MockedFunction<
  typeof signInWithEmailAndPassword
>;

function setupTest() {
  const utils = setupWithUserEvents(
    <div>
      <SignInAndSignUp />
      {/* <CreateOrManage /> */}
    </div>
  );
  const emailInputNode = utils.getByLabelText(/email/i);
  const passwordInputNode = utils.getByLabelText(/password/i);

  const clickSubmit = () => utils.userAction.click(utils.getByRole('button', { name: 'SIGN IN' }));
  const changeEmailInput = (value: string) => utils.userAction.type(emailInputNode, value);
  const changePasswordInput = (value: string) => utils.userAction.type(passwordInputNode, value);

  return {
    ...utils,
    emailInputNode,
    passwordInputNode,
    clickSubmit,
    changeEmailInput,
    changePasswordInput
  };
}

test('if email input has the correct placeholder text', () => {
  const { emailInputNode } = setupTest();

  expect(emailInputNode.getAttribute('placeholder')).toBe('Email');
});

test('if password input has the correct placeholder text', () => {
  const { passwordInputNode } = setupTest();

  expect(passwordInputNode.getAttribute('placeholder')).toBe('Password');
});

test('if email input accepts text', async () => {
  const { emailInputNode, changeEmailInput } = setupTest();

  expect(emailInputNode.getAttribute('value')).toBe('');
  await changeEmailInput('testuser@email.com');
  expect(emailInputNode.getAttribute('value')).toBe('testuser@email.com');
});

test('if password input accepts text', async () => {
  const { passwordInputNode, changePasswordInput } = setupTest();

  expect(passwordInputNode.getAttribute('value')).toBe('');
  await changePasswordInput('1234');
  expect(passwordInputNode.getAttribute('value')).toBe('1234');
});

test('if submiting a valid email and password calls the signin function with correct arguments', async () => {
  const { changeEmailInput, changePasswordInput, clickSubmit } = setupTest();

  const auth = getAuth();
  const email = 'user@email.com';
  const password = 'password1234';

  mockedSignin.mockResolvedValue({
    kind: 'identitytoolkit#VerifyPasswordResponse',
    localId: 'r9Pn67nFQ7ZHizKjqt285VMKb5R2',
    email: 'brendanhurd@hotmail.com',
    displayName: '',
    idToken:
      'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk1MWMwOGM1MTZhZTM1MmI4OWU0ZDJlMGUxNDA5NmY3MzQ5NDJhODciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZ2NjbS04MDM4YiIsImF1ZCI6ImdjY20tODAzOGIiLCJhdXRoX3RpbWUiOjE2NzAzODE0MDcsInVzZXJfaWQiOiJyOVBuNjduRlE3WkhpektqcXQyODVWTUtiNVIyIiwic3ViIjoicjlQbjY3bkZRN1pIaXpLanF0Mjg1Vk1LYjVSMiIsImlhdCI6MTY3MDM4MTQwNywiZXhwIjoxNjcwMzg1MDA3LCJlbWFpbCI6ImJyZW5kYW5odXJkQGhvdG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImJyZW5kYW5odXJkQGhvdG1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.qUVPh4vZL_f1IJ_5x1o1PCR7Azw0A_KI5iCJY_vlhpM0q7-huVr7UPG-_QtIOEDR_j2Hd37uj49w0_UbBfHqI9OlXMXU-A21jaXMBi-_LnIqU0RSe9Jaf2o9ZahZbN1l7CAxMDaENZCuY4J4RTYcit36O2r024XX9bFuY8SRdTgeAIIGCvO5k-K2MUcUKJBP4OIjiPRaOg-XI0O9dPq73QLDScQcgECugPO-Vz1NRAshwibLOTvWVtPhQHvDFSsGx3Oj9F74hEQQ7f9_obkH7UQ0onxA4vI82tP5sD6vabGY1BeeElXVH0WCGXEXGvcheu5Y0n6uBg9jr-g8K9B4qQ',
    registered: true,
    refreshToken:
      'AOkPPWSfP8CemxHG6vOUktgJ69eYbwaMrY99dagSlwZb2FMuclocYDQ8Bpzi6GYDGgIS6XvF00Dcyhm9wHy7esN1AHBSEwe-UJoIonaYLwIpjrWiVK7IjslUq7itG74_ygidv-3nHJshc3BBYIcLMo7sbmGtIISGkckJ466mxFXR3yhAwC7IyWsZD-JefCLWlgNTPD14RuV_TEV72eS7aQF0SICEInAWWQ',
    expiresIn: '3600'
  });

  await changeEmailInput(email);
  await changePasswordInput(password);
  await clickSubmit();

  expect(mockedSignin).toHaveBeenCalledTimes(1);
  expect(mockedSignin).toHaveBeenCalledWith(auth, 'user@email.com', 'password1234');
});

test('if signing in with the wrong email causes the correct alert to display', async () => {
  const { changeEmailInput, changePasswordInput, clickSubmit } = setupTest();

  const email = 'user@emai';
  const password = 'password1234';

  mockedSignin.mockRejectedValue({
    error: {
      code: 400,
      message: 'auth/user-not-found',
      errors: [
        {
          message: 'EMAIL_NOT_FOUND',
          domain: 'global',
          reason: 'invalid'
        }
      ]
    }
  });
  // mockedSignin.mockRejectedValue({
  //   error: {
  //     code: 400,
  //     message: 'EMAIL_NOT_FOUND',
  //     errors: [
  //       {
  //         message: 'EMAIL_NOT_FOUND',
  //         domain: 'global',
  //         reason: 'invalid'
  //       }
  //     ]
  //   }
  // });

  await changeEmailInput(email);
  await changePasswordInput(password);
  await clickSubmit();

  expect(mockedSignin).toHaveBeenCalled();
  //   expect(screen.getByTestId('email-alert')).toBeInTheDocument();
  expect(
    await screen.findByText('The email you have entered has not been found.')
  ).toBeInTheDocument();
});
