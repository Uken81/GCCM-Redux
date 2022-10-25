import { cleanup, screen } from '@testing-library/react';
import React from 'react';
import { renderWithProviders } from 'utils/test-utils';
import userEvent from '@testing-library/user-event';

import SearchBar from './SearchBar';
import selectEvent from 'react-select-event';

beforeEach(() => renderWithProviders(<SearchBar />));
afterEach(() => cleanup());

test('If searchBar dropdown menu appears when focused', () => {
  const searchBar = screen.getByRole('combobox');

  expect(screen.queryByText('Affliction')).not.toBeInTheDocument();
  selectEvent.openMenu(searchBar);
  expect(screen.getByText('Affliction')).toBeInTheDocument();
});
//should I be running below test here or create a new test file for SearchBarHeader??
test('If clicking on Disadvantages tab changes the searchbar title', async () => {
  const SearchBarTitle = screen.getByText(/Select your Characters/);
  const disadvantagesTab = screen.getByRole('tab', { name: 'Disadvantages' });

  expect(SearchBarTitle).toHaveTextContent('Select your Characters ADVANTAGES');

  await userEvent.click(disadvantagesTab);
  expect(SearchBarTitle).toHaveTextContent('Select your Characters DISADVANTAGES');
});

test('If clicking on Disadvantages tab changes the searchbar selections', async () => {
  const disadvantagesTab = screen.getByRole('tab', { name: 'Disadvantages' });
  const searchBar = screen.getByRole('combobox');

  selectEvent.openMenu(searchBar);
  expect(screen.getByText('Affliction')).toBeInTheDocument();

  await userEvent.click(disadvantagesTab);
  expect(screen.queryByText('Affliction')).not.toBeInTheDocument();
  expect(screen.getByText('Amnesia')).toBeInTheDocument();
});

test('If Searchbar results are empty until an option is selected', async () => {
  const searchBar = screen.getByRole('combobox');

  expect(screen.queryByDisplayValue('Affliction')).not.toBeInTheDocument();

  await selectEvent.select(searchBar, ['Affliction']);
  const selectedOption = screen.getByTestId('items-container');
  expect(selectedOption).toBeInTheDocument();
});

test('If Muliselect works and items are in selected order', async () => {
  const searchBar = screen.getByRole('combobox');

  expect(screen.queryAllByTestId('items-container').length).toBe(0);

  await selectEvent.select(searchBar, ['Affliction', 'Acute Senses', 'Catfall']);
  const selectedItems = screen.queryAllByTestId('items-container');
  expect(selectedItems.length).toBe(3);
  expect(selectedItems[1]).toHaveTextContent('Acute Senses');
});
