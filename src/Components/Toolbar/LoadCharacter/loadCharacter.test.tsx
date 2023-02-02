import { render, screen, waitFor } from '@testing-library/react';
import {
  getMatchingCharacterForUser,
  getUsersSavedCharactersList
} from '../../Firebase/firebase.utils';
import React from 'react';
import { UserContextProvider } from 'utils/mockContextProvider';
import { setupWithUserEvents } from 'utils/test-utils';
import LoadCharacter from './LoadCharacter';
import { MemoryRouter, Route, Router, Routes } from 'react-router';
import CreateOrManage from 'Pages/CreateOrManagePage';
import ManageCharactersPage from 'Pages/ManageCharactersPage';
import { createMemoryHistory } from 'history';
import CreateNewCharacterPage from 'Pages/CreateNewCharacterPage/CreateNewCharacterPage';

jest.mock('Components/Firebase/firebase.utils');
const mockedRetrieveCharactersList = getUsersSavedCharactersList as jest.MockedFunction<
  typeof getUsersSavedCharactersList
>;
const mockLoadCharacter = getMatchingCharacterForUser as jest.MockedFunction<
  typeof getMatchingCharacterForUser
>;

function setupTest() {
  // const history = createMemoryHistory({ initialEntries: ['/create-or-manage-page'] });
  // const utils = setupWithUserEvents(
  //   <Router location={history.location} navigator={history}>
  //     <Routes>
  //       <Route path="/create-or-manage-page" element={<CreateOrManage />} />
  //       <Route path="/manage-characters-page" element={<ManageCharactersPage />} />
  //       <Route path="/create-new-character-page" element={<CreateNewCharacterPage />} />
  //     </Routes>
  //   </Router>
  // );
  const utils = setupWithUserEvents(<LoadCharacter />);
  const clickLoadCharacterButton = () =>
    utils.userAction.click(screen.getByRole('button', { name: 'LOAD CHARACTER' }));
  const clickName = () =>
    utils.userAction.click(screen.getByRole('button', { name: 'character1' }));
  const clickNewCharacterButton = () =>
    utils.userAction.click(screen.getByRole('button', { name: 'Create New Character' }));

  return { ...utils, clickLoadCharacterButton, clickName, clickNewCharacterButton, history };
}

test.only('if the load character dropdown contains the list of created characters names', async () => {
  mockedRetrieveCharactersList.mockResolvedValue(['character1', 'character2']);
  const { clickLoadCharacterButton } = setupTest();
  await clickLoadCharacterButton();
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

  const { clickLoadCharacterButton, clickName, history } = setupTest();

  const location = history.location.pathname;
  console.log('location', location);
  expect(history.location.pathname).toBe('/create-or-manage-page');

  await clickLoadCharacterButton();
  expect(await screen.findByRole('button', { name: 'character1' })).toBeInTheDocument();

  // screen.debug();

  await clickName();
  console.log('location2', location);
  expect(history.location.pathname).toBe('/manage-characters-page');
  // expect(await screen.findByRole('button', { name: 'Edit Character' })).toBeInTheDocument();

  // screen.debug();
});

test('if the user clicks the create new character button, check if you are redirected to the correct URL', async () => {
  mockedRetrieveCharactersList.mockResolvedValue(['character1', 'character2']);

  const { clickNewCharacterButton, history } = setupTest();

  expect(history.location.pathname).toBe('/create-or-manage-page');

  await clickNewCharacterButton();
  expect(history.location.pathname).toBe('/create-new-character-page');
});
