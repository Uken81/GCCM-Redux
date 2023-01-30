import { screen, waitFor } from '@testing-library/react';
import { getUsersSavedCharactersList } from 'Components/Firebase/firebase.utils';
import React from 'react';
import { UserContextProvider } from 'utils/mockContextProvider';
import { setupWithUserEvents } from 'utils/test-utils';
import LoadCharacter from './LoadCharacter';

jest.mock('Components/Firebase/firebase.utils');
const mockedRetrieveCharactersList = getUsersSavedCharactersList as jest.MockedFunction<
  typeof getUsersSavedCharactersList
>;

function setupTest() {
  const utils = setupWithUserEvents(
    <div>
      <UserContextProvider>
        <LoadCharacter />
      </UserContextProvider>
    </div>
  );
  const clickButton = () =>
    utils.userAction.click(utils.getByRole('button', { name: 'LOAD CHARACTER' }));
  return { ...utils, clickButton };
}

test('if the load character dropdown contains the list of created characters names', async () => {
  mockedRetrieveCharactersList.mockResolvedValue(['character1', 'character2']);
  const { clickButton } = setupTest();

  await clickButton();
  await waitFor(() => {
    expect(screen.getByRole('button', { name: 'character1' })).toBeInTheDocument();
  });
});
