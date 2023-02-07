import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/testSetup';
import CreateOrManage from './CreateOrManagePage';
import { getUsersSavedCharactersList } from 'Components/Firebase/firebase.utils';

jest.mock('Components/Firebase/firebase.utils');
const mockedRetrieveCharactersList = getUsersSavedCharactersList as jest.MockedFunction<
  typeof getUsersSavedCharactersList
>;

function setupTest() {
  const initialEntry = '/create-or-manage-page';
  const utils = renderWithProviders(<CreateOrManage />, { initialEntry });
  return { ...utils };
}

test.only('if the user clicks the create new character button, check if you are redirected to the correct URL', async () => {
  mockedRetrieveCharactersList.mockResolvedValue(['character1', 'character2']);

  const { user, history } = setupTest();

  expect(history.location.pathname).toBe('/create-or-manage-page');

  await user.click(screen.getByRole('button', { name: 'Create New Character' }));
  expect(history.location.pathname).toBe('/create-new-character-page');
});
