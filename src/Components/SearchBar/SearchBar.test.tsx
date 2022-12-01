import React from 'react';
import { screen } from '@testing-library/react';
import { setupWithUserEvents } from 'utils/test-utils';
import selectEvent from 'react-select-event';
import Searchbar from './SearchBar';

const setupTest = () => {
  const utils = setupWithUserEvents(<Searchbar />);
  const searchbar = utils.getByRole('combobox');
  const searchbarTitle = utils.getByText(/Select your Characters/);
  const disadvantagesTab = utils.getByRole('tab', { name: 'Disadvantages' });
  const clickDisadvantagesTab = () => utils.userAction.click(disadvantagesTab);
  return {
    ...utils,
    searchbar,
    searchbarTitle,
    disadvantagesTab,
    clickDisadvantagesTab
  };
};

test('If clicking on Disadvantages tab changes the searchbar title', async () => {
  const { searchbarTitle, clickDisadvantagesTab } = setupTest();

  expect(searchbarTitle).toHaveTextContent('Select your Characters ADVANTAGES');
  await clickDisadvantagesTab();
  expect(searchbarTitle).toHaveTextContent('Select your Characters DISADVANTAGES');
});

test('If clicking on Disadvantages tab changes the searchbar options', async () => {
  const { searchbar, clickDisadvantagesTab } = setupTest();

  selectEvent.openMenu(searchbar);
  expect(screen.getByText('Affliction')).toBeInTheDocument();
  await clickDisadvantagesTab();
  expect(screen.queryByText('Affliction')).not.toBeInTheDocument();
  expect(screen.getByText('Amnesia')).toBeInTheDocument();
});

test('If Searchbar results are empty until an option is selected', async () => {
  const { searchbar } = setupTest();

  expect(screen.queryByDisplayValue('Affliction')).not.toBeInTheDocument();
  await selectEvent.select(searchbar, ['Affliction']);
  const selectedOption = screen.getByTestId('items-container');
  expect(selectedOption).toBeInTheDocument();
});

test('If Muliselect works and items are in selected order', async () => {
  const { searchbar } = setupTest();

  expect(screen.queryAllByTestId('items-container').length).toBe(0);
  await selectEvent.select(searchbar, ['Affliction', 'Acute Senses', 'Catfall']);
  const selectedOptions = screen.queryAllByTestId('items-container');
  expect(selectedOptions.length).toBe(3);
  expect(selectedOptions[1]).toHaveTextContent('Acute Senses');
});
