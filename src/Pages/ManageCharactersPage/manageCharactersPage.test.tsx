import { screen } from '@testing-library/react';
import React from 'react';
import { setupWithUserEvents } from 'utils/test-utils';
import ManageCharactersPage from './ManageCharactersPage';

function setUpTest() {
  const utils = setupWithUserEvents(<ManageCharactersPage />, {
    preloadedState: {
      character: {
        name: 'Test Character',
        advantages: ['contacts'],
        disadvantages: ['loner'],
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
  return { ...utils };
}

test('Check if the page is loading with the correct values from the character', async () => {
  setUpTest();
  expect(screen.getByRole('heading', { name: "Test Character's Cheatsheet" })).toBeInTheDocument();
  expect(screen.getByRole('listitem', { name: 'contacts' })).toBeInTheDocument();
  expect(screen.getByRole('listitem', { name: 'loner' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Delete Test Character' })).toBeInTheDocument();
});
