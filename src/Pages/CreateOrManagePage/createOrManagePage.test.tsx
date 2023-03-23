import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/testSetup';
import CreateOrManage from './CreateOrManagePage';
import { getUsersSavedCharacterList } from 'Components/Firebase/firebase.utils';

jest.mock('Components/Firebase/firebase.utils');
const mockedRetrieveCharactersList = getUsersSavedCharacterList as jest.MockedFunction<
  typeof getUsersSavedCharacterList
>;

function setupTest() {
  const initialEntry = '/create-or-manage-page';
  const utils = renderWithProviders(<CreateOrManage />, { initialEntry });
  return { ...utils };
}

test('if the user clicks the create new character button, check if you are redirected to the correct URL', async () => {
  mockedRetrieveCharactersList.mockResolvedValue([]);

  const { user, history } = setupTest();

  expect(history.location.pathname).toBe('/create-or-manage-page');

  await user.click(screen.getByRole('button', { name: 'New Character' }));
  expect(history.location.pathname).toBe('/create-new-character-page');
});
