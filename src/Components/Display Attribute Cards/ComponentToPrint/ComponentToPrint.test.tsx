import React from 'react';
import Searchbar from 'Components/Searchbar/Searchbar';
import { setupWithUserEvents } from 'utils/test-utils';
import ComponentToPrint from './ComponentToPrint';
import { screen } from '@testing-library/react';
import selectEvent from 'react-select-event';

test('if attribute card appears in correct component', async () => {
  const { userAction } = setupWithUserEvents(
    <div>
      <Searchbar />
      <ComponentToPrint divRef={undefined} />
    </div>
  );

  const searchbar = screen.getByRole('combobox');
  const disadvantagesTab = screen.getByRole('tab', { name: 'Disadvantages' });

  await selectEvent.select(searchbar, ['Absolute Direction']);
  await userAction.click(disadvantagesTab);
  await selectEvent.select(searchbar, ['Amnesia']);

  expect(screen.getByText(/^You have an excellent sense of direction/)).toBeInTheDocument();
  expect(screen.getByText(/^You’ve lost your memory/)).toBeInTheDocument();
});
