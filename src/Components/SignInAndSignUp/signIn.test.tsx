import { act, screen } from '@testing-library/react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import CreateOrManage from 'Pages/CreateOrManagePage';
import SignInAndSignUp from 'Pages/SignInAndSignUp/SignInAndSignUpPage';
import React from 'react';
import { setupWithUserEvents } from 'utils/test-utils';
import handleSubmit from './signin.utils.tsx/handleSubmit';

// jest.mock('./signin.utils.tsx/handleSubmit');
// const mockedHandleSubmit = handleSubmit as jest.MockedFunction<typeof handleSubmit>;

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

test.only('if submiting a valid email and password calls the signin function with correct arguments', async () => {
  const { changeEmailInput, changePasswordInput, clickSubmit } = setupTest();

  const auth = getAuth();
  const email = 'user@email.com';
  const password = 'password1234';

  mockedSignin.mockResolvedValue({
    kind: 'identitytoolkit#VerifyPasswordResponse',
    localId: 'r9Pn67nFQ7ZHizKjqt285VMKb5R2',
    email: 'user@email.com',
    displayName: '',
    idToken:
      'eyJhbGciOiJSUzI1NiIsImtpZCI6ImE5NmFkY2U5OTk5YmJmNWNkMzBmMjlmNDljZDM3ZjRjNWU2NDI3NDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZ2NjbS04MDM4YiIsImF1ZCI6ImdjY20tODAzOGIiLCJhdXRoX3RpbWUiOjE2NjkyNzc4NzYsInVzZXJfaWQiOiJyOVBuNjduRlE3WkhpektqcXQyODVWTUtiNVIyIiwic3ViIjoicjlQbjY3bkZRN1pIaXpLanF0Mjg1Vk1LYjVSMiIsImlhdCI6MTY2OTI3Nzg3NiwiZXhwIjoxNjY5MjgxNDc2LCJlbWFpbCI6ImJyZW5kYW5odXJkQGhvdG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImJyZW5kYW5odXJkQGhvdG1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.LwDgO_y9E67UpV9jsyaXb0EXvgoSzkAoDjRjCTW-Sma9veLR8AKfTfX3F1dofwgW8A5lFEl2cmZFSsRFx4azMiClpSxStXvGsYxY-kca8V-oGn5HYkEu0nhWeZbsGb3mSpTx424n5lgQZS1pLbD8hoflq7bQ6Mq-0Tc6yEVPqJgbnJzge6kvYoDnGEFKUb4nPqBUzDZ78WpBT9cMGna0da_W87e0w1lggaqMshNfjPmKB-YTbpb5okVGfp03QgEuAnYcA5Zs7bEf1Nm6W4PyydVBK1Hg8dlZScx5UzIjXHEEgyRibm40rHfWd1lKBN_rPct55xjJECYir_n1izvu_A',
    registered: true,
    refreshToken:
      'AOkPPWQkSOfE-0WAsBf813K0GfIeGKErsQsrnpZXnkSeHUq2ub9vW4vwhPccyFOBvtCJlT80JWw-aRRGz4_xKKYyramChLBC_fhKWodTZ85RbZ-ZlrZyDwnXTyUaq4-tz_MUgWZQIQTbZsXvTQixkyU2GXF_mKzFPhTVvwh0w46-dI-TStGqtgWmDJeeV_yo5gGIhOo6igWaCCYjDaJ1wWv6Lmo3r0foUQ',
    expiresIn: '3600'
  });

  await act(async () => {
    await changeEmailInput(email);
    await changePasswordInput(password);
    await clickSubmit();
  });

  expect(mockedSignin).toHaveBeenCalledTimes(1);
  expect(mockedSignin).toHaveBeenCalledWith(auth, 'user@email.com', 'password1234');
});

test('if signing in with the wrong email causes the correct alert to display', async () => {
  const { changeEmailInput, changePasswordInput, clickSubmit } = setupTest();

  const auth = getAuth();
  const email = 'user@emai';
  const password = 'password1234';

  mockedSignin.mockRejectedValue({
    error: {
      code: 400,
      message: 'EMAIL_NOT_FOUND',
      errors: [
        {
          message: 'EMAIL_NOT_FOUND',
          domain: 'global',
          reason: 'invalid'
        }
      ]
    }
  });

  await act(async () => {
    await changeEmailInput(email);
    await changePasswordInput(password);
    await clickSubmit();
  });

  expect(mockedSignin).toHaveBeenCalled();
  //   expect(screen.getByTestId('email-alert')).toBeInTheDocument();
  expect(
    await screen.findByText('The email you have entered has not been found.')
  ).toBeInTheDocument();
});
