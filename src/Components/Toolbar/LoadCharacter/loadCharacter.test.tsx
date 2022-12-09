import { screen } from '@testing-library/react';
import { UserContext } from 'context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { setupWithUserEvents } from 'utils/test-utils';
import { CreateCharactersList } from './CharacterList.utils';
import LoadCharacter from './LoadCharacter';

// jest.mock('firebase/auth');
// const mockedSignin = signInWithEmailAndPassword as jest.MockedFunction<
//   typeof signInWithEmailAndPassword
// >;

jest.mock('./CharacterList.utils');
const mockedRetrieveCharactersList = CreateCharactersList as jest.MockedFunction<
  typeof CreateCharactersList
>;

function setupTest() {
  const utils = setupWithUserEvents(
    <div>
      <UserContext.Provider
        value={{
          kind: 'identitytoolkit#GetAccountInfoResponse',
          users: [
            {
              localId: 'r9Pn67nFQ7ZHizKjqt285VMKb5R2',
              email: 'brendanhurd@hotmail.com',
              passwordHash: 'UkVEQUNURUQ=',
              emailVerified: false,
              passwordUpdatedAt: 1652338614906,
              providerUserInfo: [
                {
                  providerId: 'password',
                  federatedId: 'brendanhurd@hotmail.com',
                  email: 'brendanhurd@hotmail.com',
                  rawId: 'brendanhurd@hotmail.com'
                }
              ],
              validSince: '1652338614',
              lastLoginAt: '1670306694035',
              createdAt: '1652338614906',
              lastRefreshAt: '2022-12-06T06:04:54.035Z'
            }
          ]
        }}>
        {/* <SignInAndSignUp /> */}
        {/* <CreateOrManage /> */}
        <LoadCharacter />
      </UserContext.Provider>
    </div>
  );
  const clickButton = () =>
    utils.userAction.click(utils.getByRole('button', { name: 'LOAD CHARACTER' }));
  const text = utils.findByText('character1');
  return { ...utils, text, clickButton };
}

test('If list is loading', async () => {
  const { clickButton, text } = setupTest();

  // mockedRetrieveCharactersList.mockImplementation(() =>
  //   Promise.resolve(['character1', 'character2'])
  // );

  // mockedRetrieveCharactersList.mockResolvedValue(['character1', 'character2']);
  //   mockedRetrieveCharactersList.mockResolvedValue(() => ['character1', 'character2']);

  await clickButton();
  screen.debug();
  expect(screen.getByText('character1')).toBeInTheDocument();
  // expect(mockedRetrieveCharactersList).toBeCalled();
  //   expect(text).toBeInTheDocument();
});
