import React from 'react';
import Searchbar from 'Components/SearchBar/Searchbar';
import ComponentToPrint from './ComponentToPrint';
import { screen } from '@testing-library/react';
import selectEvent from 'react-select-event';
import { renderWithProviders } from 'utils/testSetup';

function setupTest() {
  const utils = renderWithProviders(
    <div>
      <Searchbar />
      <ComponentToPrint divRef={undefined} />
    </div>
  );
  return { ...utils };
}

test('if attribute card appears in correct component and containing correct information', async () => {
  const { user } = setupTest();
  const searchbar = screen.getByRole('combobox');

  await selectEvent.select(searchbar, ['Absolute Direction']);
  await user.click(screen.getByRole('tab', { name: 'Disadvantages' }));

  expect(await screen.findByRole('heading', { name: 'Advantages' })).toBeInTheDocument();
  expect(await screen.findByText('5 or 10 points')).toBeInTheDocument();
  expect(await screen.findAllByText('Absolute Direction')).toHaveLength(3);
  expect(await screen.findByText(/^You have an excellent sense of direction/)).toBeInTheDocument();
  expect(await screen.findByText('3D Spatial Sense')).toBeInTheDocument();

  await selectEvent.select(searchbar, ['Amnesia']);
  expect(await screen.findByText(/^You’ve lost your memory/)).toBeInTheDocument();
  expect(await screen.findByRole('heading', { name: 'Disadvantages' })).toBeInTheDocument();
  expect(await screen.findByText(/^You can only buy off Amnesia/)).toBeInTheDocument();
});
