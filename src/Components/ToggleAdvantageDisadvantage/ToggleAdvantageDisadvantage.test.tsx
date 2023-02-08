import React from 'react';
import { renderWithProviders } from 'utils/testSetup';
import { screen } from '@testing-library/react';
import Searchbar from 'Components/SearchBar/Searchbar';
import DisplaySelected from 'Components/Selected/Display Selected/DisplaySelected';

function setupTest() {
  const utils = renderWithProviders(
    <div>
      <Searchbar />
      <DisplaySelected />
    </div>
  );
  return {
    ...utils
  };
}

test('if clicking on a tab will select it and deselect the other', async () => {
  const { user } = setupTest();

  await user.click(screen.getByRole('tab', { name: 'Disadvantages' }));
  expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Disadvantages');
  expect(screen.getByRole('tab', { selected: false })).toHaveTextContent('Advantages');

  await user.click(screen.getByRole('tab', { name: 'Advantages' }));
  expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Advantages');
  expect(screen.getByRole('tab', { selected: false })).toHaveTextContent('Disadvantages');
});

test('if clicking on selected lists element changes the selected tab', async () => {
  const { user } = setupTest();

  await user.click(screen.getByRole('heading', { name: 'Selected Disadvantages' }));
  expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Disadvantages');
  expect(screen.getByRole('tab', { selected: false })).toHaveTextContent('Advantages');

  await user.click(screen.getByRole('heading', { name: 'Selected Advantages' }));
  expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Advantages');
  expect(screen.getByRole('tab', { selected: false })).toHaveTextContent('Disadvantages');
});
