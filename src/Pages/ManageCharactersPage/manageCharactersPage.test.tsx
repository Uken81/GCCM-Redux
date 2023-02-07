import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testSetup';
import ManageCharactersPage from './ManageCharactersPage';

function setUpTest() {
  renderWithProviders(<ManageCharactersPage />, {
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
}

test('Check if the page is loading with the correct values from the characters stored data', async () => {
  setUpTest();

  expect(screen.getByRole('heading', { name: "Test Character's Cheatsheet" })).toBeInTheDocument();
  expect(screen.getByRole('listitem', { name: 'contacts' })).toBeInTheDocument();
  expect(screen.getByRole('listitem', { name: 'loner' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Delete Test Character' })).toBeInTheDocument();
});
