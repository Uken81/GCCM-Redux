import React from 'react';
import SearchBar from 'Components/SearchBar/SearchBar';
import { renderWithProviders } from 'utils/test-utils';
import ComponentToPrint from './ComponentToPrint';
import { screen } from '@testing-library/react';
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';

beforeEach(() =>
  renderWithProviders(
    <div>
      <SearchBar />
      <ComponentToPrint divRef={undefined} />
    </div>
  )
);

test('if attribute card appears in correct component', async () => {
  const searchBar = screen.getByRole('combobox');
  const disadvantagesTab = screen.getByRole('tab', { name: 'Disadvantages' });

  await selectEvent.select(searchBar, ['Absolute Direction']);
  await userEvent.click(disadvantagesTab);
  await selectEvent.select(searchBar, ['Amnesia']);

  expect(screen.getByText(/^You have an excellent sense of direction/)).toBeInTheDocument();
  expect(screen.getByText(/^You’ve lost your memory/)).toBeInTheDocument();
});
