/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/testSetup';
import selectEvent from 'react-select-event';
import Searchbar from './Searchbar';

const setupTest = () => {
  const utils = renderWithProviders(<Searchbar />);
  return {
    ...utils
  };
};

test('If clicking on the Disadvantages tab changes the searchbar title', async () => {
  const { user } = setupTest();

  expect(screen.getByRole('heading')).toHaveTextContent('Select your Characters ADVANTAGES');

  await user.click(screen.getByRole('tab', { name: 'Disadvantages' }));
  expect(screen.getByRole('heading')).toHaveTextContent('Select your Characters DISADVANTAGES');
});

test('If clicking on Disadvantages tab changes the searchbar options', async () => {
  const { user } = setupTest();

  selectEvent.openMenu(screen.getByRole('combobox'));
  expect(screen.getByText('Affliction')).toBeInTheDocument();

  await user.click(screen.getByRole('tab', { name: 'Disadvantages' }));
  expect(screen.queryByText('Affliction')).not.toBeInTheDocument();
  expect(screen.getByText('Amnesia')).toBeInTheDocument();
});

test('If Searchbar results are empty until an option is selected', async () => {
  setupTest();

  expect(screen.queryByDisplayValue('Affliction')).not.toBeInTheDocument();

  await selectEvent.select(screen.getByRole('combobox'), ['Affliction']);
  expect(screen.getByDisplayValue('Affliction')).toBeInTheDocument();
});

test('If Muliselect works and items are in alphabetical order', async () => {
  setupTest();

  expect(screen.queryAllByTestId('items-container').length).toBe(0);

  await selectEvent.select(screen.getByRole('combobox'), ['Affliction', 'Acute Senses', 'Catfall']);
  const selectedOptions = screen.queryAllByTestId('items-container');
  expect(selectedOptions.length).toBe(3);
  expect(selectedOptions[1]).toHaveTextContent('Affliction');
});
