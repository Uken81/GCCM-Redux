import { screen } from '@testing-library/react';
import React from 'react';
import { setupWithUserEvents } from 'utils/test-utils';
import ManageCharactersPage from './ManageCharactersPage';

function setUpTest() {
  const utils = setupWithUserEvents(<ManageCharactersPage />);
  return { ...utils };
}

test('Check if the page is loading with the correct values from the character', async () => {
  setUpTest();
  expect(await screen.findByText("Test Character's CHEATSHEET")).toBeInTheDocument();
});
