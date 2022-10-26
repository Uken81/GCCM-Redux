import React from 'react';
import SearchBar from 'Components/SearchBar/SearchBar';
import { renderWithProviders } from 'utils/test-utils';
import ComponentToPrint from './ComponentToPrint';
import { screen, within } from '@testing-library/react';
import selectEvent from 'react-select-event';
import { debug } from 'console';

beforeEach(() =>
  renderWithProviders(
    <div>
      <SearchBar />
      <ComponentToPrint divRef={undefined} />
    </div>
  )
);

test('if attribute card appears in correct component', async () => {
  await selectEvent.select(screen.getByRole('combobox'), ['Absolute Direction']);

  //   const container = screen.getByText('5 or 10 points');
  expect(screen.getByText(/^You have an excellent sense of direction/)).toBeInTheDocument();
  //   const container = screen.getByRole('heading', { level: 3 });
  //   const test = within(container).getByText('5 or 10 points');
  //   debug(test);
});
