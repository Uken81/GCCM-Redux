import React from 'react';
import SearchBar from 'Components/SearchBar/SearchBar';
import { renderWithProviders } from 'utils/test-utils';
import DisplaySelected from './DisplaySelected';
import { screen } from '@testing-library/react';
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';

beforeEach(() =>
  renderWithProviders(
    <div>
      <SearchBar />
      <DisplaySelected />
    </div>
  )
);

// const selectDisadvantage = () => {
//   const disadvantagesTab = screen.getByRole('tab', { name: 'Disadvantages' });

//   userEvent.click(disadvantagesTab);
// };

test('if selecting an advantage displays its name in the appropriate selected box', async () => {
  const searchBar = screen.getByRole('combobox');

  await selectEvent.select(searchBar, ['Catfall']);
  expect(screen.getByRole('listitem')).toHaveTextContent('Catfall');
});

test('if selected advantage is correct color', async () => {
  const searchBar = screen.getByRole('combobox');

  await selectEvent.select(searchBar, ['Catfall']);
  const selectedAdvantage = screen.getByRole('listitem');
  expect(selectedAdvantage).toHaveStyle('color: seagreen');
});

test('if selecting a disadvantage displays its name in the appropriate selected box', async () => {
  const disadvantagesTab = screen.getByRole('tab', { name: 'Disadvantages' });
  const searchBar = screen.getByRole('combobox');

  await userEvent.click(disadvantagesTab);
  //   await selectDisadvantage();
  await selectEvent.select(searchBar, ['Confused']);
  expect(screen.getByRole('listitem')).toHaveTextContent('Confused');
});

test('if selected disadvantage is correct color', async () => {
  const disadvantagesTab = screen.getByRole('tab', { name: 'Disadvantages' });
  const searchBar = screen.getByRole('combobox');

  await userEvent.click(disadvantagesTab);
  await selectEvent.select(searchBar, ['Confused']);
  const selectedDisadvantage = screen.getByRole('listitem');
  expect(selectedDisadvantage).toHaveStyle('color: brown');
});
