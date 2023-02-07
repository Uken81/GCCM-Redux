import { screen } from '@testing-library/react';
import {
  getMatchingCharacterForUser,
  getUsersSavedCharactersList
} from '../../Firebase/firebase.utils';
import React from 'react';
import { renderWithProviders } from 'utils/testSetup';
import LoadCharacter from './LoadCharacter';

jest.mock('Components/Firebase/firebase.utils');
const mockedRetrieveCharactersList = getUsersSavedCharactersList as jest.MockedFunction<
  typeof getUsersSavedCharactersList
>;
const mockLoadCharacter = getMatchingCharacterForUser as jest.MockedFunction<
  typeof getMatchingCharacterForUser
>;

function setupTest() {
  const initialEntry = '/create-or-manage-page';
  const utils = renderWithProviders(<LoadCharacter />, { initialEntry });
  return { ...utils };
}

test('if the load character dropdown contains the list of created characters names', async () => {
  mockedRetrieveCharactersList.mockResolvedValue(['character1', 'character2']);
  const { user } = setupTest();

  await user.click(screen.getByRole('button', { name: 'LOAD CHARACTER' }));
  expect(await screen.findByRole('button', { name: 'character1' })).toBeInTheDocument();
});

test('if clicking on character link navigates to correct page', async () => {
  mockedRetrieveCharactersList.mockResolvedValue(['character1', 'character2']);
  mockLoadCharacter.mockResolvedValue({
    name: 'test character',
    id: 'testid',
    advantages: [],
    disadvantages: []
  });

  const { user, history } = setupTest();
  expect(history.location.pathname).toBe('/create-or-manage-page');

  await user.click(screen.getByRole('button', { name: 'LOAD CHARACTER' }));

  expect(await screen.findByRole('button', { name: 'character1' })).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'character1' }));
  expect(history.location.pathname).toBe('/manage-characters-page');
});
