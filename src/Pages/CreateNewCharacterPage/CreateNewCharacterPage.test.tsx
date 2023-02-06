import React from 'react';
import { screen } from '@testing-library/react';
import { setupWithUserEvents } from 'utils/test-utils';
import CreateNewCharacterPage from './CreateNewCharacterPage';
import selectEvent from 'react-select-event';
import {
  addNewCharacterForUser,
  createCharacterDocument,
  getUsersSavedCharactersList
} from 'Components/Firebase/firebase.utils';
import { DocumentReference, FirestoreDataConverter } from 'firebase/firestore';

jest.mock('Components/Firebase/firebase.utils');
const mockAddNewCharacter = addNewCharacterForUser as jest.MockedFunction<
  typeof addNewCharacterForUser
>;
const mockGetUsersCharactersList = getUsersSavedCharactersList as jest.MockedFunction<
  typeof getUsersSavedCharactersList
>;
const mockCreateCharacterDoc = createCharacterDocument as jest.MockedFunction<
  typeof createCharacterDocument
>;

const mockCharacterDocument = {
  type: 'document',
  converter: null,
  firestore: '',
  id: 'testid',
  path: '',
  parent: undefined,
  withConverter: function <U>(converter: FirestoreDataConverter<U>): DocumentReference<U> {
    throw new Error('Function not implemented.');
  }
};

function setUpTest() {
  const { userAction } = setupWithUserEvents(<CreateNewCharacterPage />);
  return { userAction };
}

test('if correct initial searchbar title is present', () => {
  setUpTest();
  expect(
    screen.getByRole('heading', { name: 'Select your Characters ADVANTAGES' })
  ).toBeInTheDocument();
});

test('if searchbar heading changes when a characters name is submitted', async () => {
  const { userAction } = setUpTest();

  const nameTextInput = screen.getByRole('textbox', { name: 'character-name-form' });

  await userAction.type(nameTextInput, 'test name');
  await userAction.keyboard('{Enter}');
  expect(
    screen.getByRole('heading', { name: "SELECT TEST NAME'S ADVANTAGES" })
  ).toBeInTheDocument();
});

test('if clicking on the disadvantages tab changes the search bar heading text and then clicking on advantages tab changes it back', async () => {
  const { userAction } = setUpTest();

  expect(
    screen.getByRole('heading', { name: 'Select your Characters ADVANTAGES' })
  ).toBeInTheDocument();

  const disadvantageTab = screen.getByRole('tab', { name: 'Disadvantages' });
  await userAction.click(disadvantageTab);
  expect(
    screen.getByRole('heading', { name: 'Select your Characters DISADVANTAGES' })
  ).toBeInTheDocument();

  const advantageTab = screen.getByRole('tab', { name: 'Advantages' });
  await userAction.click(advantageTab);
  expect(
    screen.getByRole('heading', { name: 'Select your Characters ADVANTAGES' })
  ).toBeInTheDocument();
});

test('if selecting an attribute correctly displays the correct information', async () => {
  setUpTest();

  const searchbar = screen.getByRole('combobox');
  await selectEvent.select(searchbar, ['Absolute Direction']);
  expect(screen.getAllByText('Absolute Direction').length).toBe(4);
});

test('if clicking on the reset character button correctly resets all the values on the page', async () => {
  const { userAction } = setUpTest();

  const searchbar = screen.getByRole('combobox');
  await selectEvent.select(searchbar, ['Absolute Direction']);

  await userAction.click(screen.getByRole('button', { name: 'Reset Character' }));
  expect(screen.queryAllByText('Absolute Direction').length).toBe(0);
  expect(
    screen.getByRole('heading', { name: 'Select your Characters ADVANTAGES' })
  ).toBeInTheDocument();
});

test('if clicking on the save character button correctly calls the createCharacterDocument function with correct arguments', async () => {
  mockGetUsersCharactersList.mockResolvedValue(['not duplicate']);

  mockAddNewCharacter.mockResolvedValue(mockCharacterDocument);
  // mockAddNewCharacter.mockRejectedValue(testDoc);
  const { userAction } = setupWithUserEvents(<CreateNewCharacterPage />, {
    preloadedState: {
      character: {
        name: 'Test Character',
        advantages: ['contacts'],
        disadvantages: ['loner'],
        id: '123'
      },
      toggle: {
        isChoosingAdvantages: true
      },
      options: {
        selectedOptions: []
      }
    }
  });

  const saveCharacterButton = screen.getByRole('button', { name: 'Save Character' });
  await userAction.click(saveCharacterButton);
  expect(mockCreateCharacterDoc).toHaveBeenCalledWith(mockCharacterDocument, 'testid');
});

test('if successful save alert is displayed only after the character is saved', async () => {
  mockGetUsersCharactersList.mockResolvedValue(['not duplicate']);
  mockAddNewCharacter.mockResolvedValue(mockCharacterDocument);

  const { userAction } = setupWithUserEvents(<CreateNewCharacterPage />, {
    preloadedState: {
      character: {
        name: 'Test Character',
        advantages: ['contacts'],
        disadvantages: ['loner'],
        id: '123'
      },
      toggle: {
        isChoosingAdvantages: true
      },
      options: {
        selectedOptions: []
      }
    }
  });

  expect(screen.queryByRole('alert')).not.toBeInTheDocument();

  const saveCharacterButton = screen.getByRole('button', { name: 'Save Character' });
  await userAction.click(saveCharacterButton);
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Test Character has been succesfully saved.'
  );
});
