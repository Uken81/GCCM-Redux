import React from 'react';
import { screen } from '@testing-library/react';
import { setupWithUserEvents } from 'utils/test-utils';
import CreateNewCharacterPage from './CreateNewCharacterPage';

function setUpTest() {
  const { userAction } = setupWithUserEvents(<CreateNewCharacterPage />, {
    preloadedState: {
      character: {
        name: '',
        advantages: [],
        disadvantages: [],
        id: ''
      },
      toggle: {
        isChoosingAdvantages: true
      },
      options: {
        selectedOptions: []
      }
    }
  });
  return { userAction };
}

test('if searchbar heading changes when a characters name is submitted', async () => {
  const { userAction } = setUpTest();

  const nameTextInput = screen.getByRole('textbox', { name: 'character-name-form' });

  await userAction.type(nameTextInput, 'Test Character');
  await userAction.keyboard('{Enter}');
  expect(
    screen.getByRole('heading', { name: "SELECT TEST CHARACTER'S ADVANTAGES" })
  ).toBeInTheDocument();
});
