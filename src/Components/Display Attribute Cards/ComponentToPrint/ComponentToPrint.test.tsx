/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import Searchbar from 'Components/SearchBar/Searchbar';
import ComponentToPrint from './ComponentToPrint';
import { screen } from '@testing-library/react';
import selectEvent from 'react-select-event';
import { renderWithProviders } from 'utils/testSetup';

function setupTest() {
  const utils = renderWithProviders(
    <>
      <Searchbar />
      <ComponentToPrint divRef={undefined} />
    </>
  );
  return { ...utils };
}

test('if attribute card appears in correct component and containing correct information', async () => {
  const { user } = setupTest();
  const searchbar = screen.getByRole('combobox');

  await selectEvent.select(searchbar, ['Absolute Direction']);
  expect(screen.getByRole('heading', { name: 'Advantages' })).toBeInTheDocument();
  expect(screen.getByText('5 or 10 points')).toBeInTheDocument();
  expect(screen.getAllByText('Absolute Direction')).toHaveLength(3);
  expect(screen.getByText(/^You have an excellent sense of direction/)).toBeInTheDocument();
  expect(screen.getByText('3D Spatial Sense')).toBeInTheDocument();

  await user.click(screen.getByRole('tab', { name: 'Disadvantages' }));
  await selectEvent.select(searchbar, ['Amnesia']);
  expect(screen.getByRole('heading', { name: 'Disadvantages' })).toBeInTheDocument();
  expect(screen.getByText(/^You’ve lost your memory/)).toBeInTheDocument();
  expect(screen.getByText(/^You can only buy off Amnesia/)).toBeInTheDocument();
});
