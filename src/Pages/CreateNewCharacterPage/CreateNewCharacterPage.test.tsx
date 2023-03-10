/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { screen } from '@testing-library/react';
import CreateNewCharacterPage from './CreateNewCharacterPage';
import selectEvent from 'react-select-event';
import { addNewCharacter, getUsersSavedCharacterList } from 'Components/Firebase/firebase.utils';
import { renderWithProviders } from 'utils/testSetup';
import { NewCharacterStatsObj } from '../../../types';

jest.mock('Components/Firebase/firebase.utils');
const mockAddNewCharacter = addNewCharacter as jest.MockedFunction<typeof addNewCharacter>;

const mockRetrieveCharacterList = getUsersSavedCharacterList as jest.MockedFunction<
  typeof getUsersSavedCharacterList
>;

const preloadedState = {
  preloadedState: {
    character: {
      name: 'Test Character',
      advantages: ['contacts'],
      disadvantages: ['loner'],
      id: '123'
    },
    toggle: {
      isChoosingAdvantages: true
    }
  }
};

function setUpTest() {
  const utils = renderWithProviders(<CreateNewCharacterPage />);
  return { ...utils };
}

test('if searchbar heading changes when a characters name is submitted', async () => {
  const { user } = setUpTest();

  expect(
    screen.getByRole('heading', { name: 'Select your Characters ADVANTAGES' })
  ).toBeInTheDocument();

  const nameTextInput = screen.getByRole('textbox', { name: 'character-name-form' });
  await user.clear(nameTextInput);
  await user.type(nameTextInput, 'test name');
  await user.keyboard('{Enter}');
  expect(
    screen.getByRole('heading', { name: "SELECT TEST NAME'S ADVANTAGES" })
  ).toBeInTheDocument();
});

test('if clicking on the disadvantages tab changes the search bar heading text and then clicking on advantages tab changes it back', async () => {
  const { user } = setUpTest();

  expect(
    screen.getByRole('heading', { name: 'Select your Characters ADVANTAGES' })
  ).toBeInTheDocument();

  const disadvantageTab = screen.getByRole('tab', { name: 'Disadvantages' });
  await user.click(disadvantageTab);
  expect(
    screen.getByRole('heading', { name: 'Select your Characters DISADVANTAGES' })
  ).toBeInTheDocument();

  const advantageTab = screen.getByRole('tab', { name: 'Advantages' });
  await user.click(advantageTab);
  expect(
    screen.getByRole('heading', { name: 'Select your Characters ADVANTAGES' })
  ).toBeInTheDocument();
});

test('if selecting an attribute displays the correct information', async () => {
  setUpTest();

  const searchbar = screen.getByRole('combobox');
  await selectEvent.select(searchbar, ['Absolute Direction']);
  expect(screen.getAllByText('Absolute Direction').length).toBe(4);
});

test('if clicking on the reset character button resets all the values on the page', async () => {
  const { user } = setUpTest();

  const searchbar = screen.getByRole('combobox');
  await selectEvent.select(searchbar, ['Absolute Direction']);

  await user.click(screen.getByRole('button', { name: 'Reset Character' }));
  expect(screen.queryAllByText('Absolute Direction').length).toBe(0);
  expect(
    screen.getByRole('heading', { name: 'Select your Characters ADVANTAGES' })
  ).toBeInTheDocument();
});

test('if clicking on the save character button calls the createCharacterDocument function with correct arguments', async () => {
  const expectedUserId = '1234567890';
  const expectedNewCharacter = {
    name: 'Test Character',
    advantages: ['contacts'],
    disadvantages: ['loner']
  };
  mockRetrieveCharacterList.mockResolvedValue(['not duplicate']);
  mockAddNewCharacter.mockImplementation(
    async (userId: string, newCharacter: NewCharacterStatsObj) => {
      return Promise.resolve();
    }
  );

  const { user } = renderWithProviders(<CreateNewCharacterPage />, preloadedState);

  const saveCharacterButton = screen.getByRole('button', { name: 'Save Character' });
  await user.click(saveCharacterButton);
  expect(addNewCharacter).toHaveBeenCalledWith(expectedUserId, expectedNewCharacter);
});

test('if successful, save alert is displayed only after the character is saved', async () => {
  mockRetrieveCharacterList.mockResolvedValue(['not duplicate']);
  mockAddNewCharacter.mockImplementation(
    async (userId: string, newCharacter: NewCharacterStatsObj) => {
      return Promise.resolve();
    }
  );
  const { user } = renderWithProviders(<CreateNewCharacterPage />, preloadedState);

  expect(screen.queryByRole('alert')).not.toBeInTheDocument();

  const saveCharacterButton = screen.getByRole('button', { name: 'Save Character' });
  await user.click(saveCharacterButton);
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Test Character has been succesfully saved.'
  );
});

describe('if the correct alerts are displayed when a save character requirement is not met', () => {
  test('duplicate character name', async () => {
    mockRetrieveCharacterList.mockResolvedValue(['Test Character']);
    const { user } = renderWithProviders(<CreateNewCharacterPage />, preloadedState);

    await user.click(screen.getByRole('button', { name: 'Save Character' }));
  });

  test('no character name entered', async () => {
    mockRetrieveCharacterList.mockResolvedValue(['Test Character']);
    const { user } = setUpTest();

    await user.click(screen.getByRole('button', { name: 'Save Character' }));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'You must type a name for your character and press enter in order to save'
    );
  });

  test('no attributes selected', async () => {
    mockRetrieveCharacterList.mockResolvedValue(['Test Character']);
    const { user } = setUpTest();

    const nameTextInput = screen.getByRole('textbox', { name: 'character-name-form' });
    await user.clear(nameTextInput);
    await user.type(nameTextInput, 'test name');
    await user.keyboard('{Enter}');

    await user.click(screen.getByRole('button', { name: 'Save Character' }));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'You must select at least one Advantage or Disadvantage'
    );
  });

  test('failed to save', async () => {
    mockRetrieveCharacterList.mockResolvedValue(['not-duplicate']);
    mockAddNewCharacter.mockImplementation(
      async (userId: string, newCharacter: NewCharacterStatsObj) => {
        return Promise.reject();
      }
    );

    const { user } = renderWithProviders(<CreateNewCharacterPage />, preloadedState);

    await user.click(screen.getByRole('button', { name: 'Save Character' }));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Failed to save to database, please try again later.'
    );
  });
});
