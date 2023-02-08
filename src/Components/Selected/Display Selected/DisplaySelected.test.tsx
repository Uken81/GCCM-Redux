import React from 'react';
import Searchbar from 'Components/SearchBar/Searchbar';
import { renderWithProviders } from 'utils/testSetup';
import DisplaySelected from './DisplaySelected';
import { screen } from '@testing-library/react';
import selectEvent from 'react-select-event';

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

test('if selecting an advantage from searchbar displays its name in the correct selected box', async () => {
  setupTest();

  await selectEvent.select(screen.getByRole('combobox'), ['Catfall']);
  expect(await screen.findByRole('listitem', { name: 'Catfall' })).toBeInTheDocument();
  expect(await screen.findByRole('listitem', { name: 'Catfall' })).toHaveStyle('color: seagreen');
});

test('if selecting a disadvantage from searchbar displays its name in the correct selected box', async () => {
  const { user } = setupTest();

  await user.click(screen.getByRole('tab', { name: 'Disadvantages' }));
  await selectEvent.select(screen.getByRole('combobox'), ['Confused']);
  expect(await screen.findByRole('listitem', { name: 'Confused' })).toBeInTheDocument();
  expect(await screen.findByRole('listitem', { name: 'Confused' })).toHaveStyle('color: brown');
});
