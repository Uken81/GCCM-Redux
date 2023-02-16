/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import Searchbar from 'Components/SearchBar/Searchbar';
import { renderWithProviders } from 'utils/testSetup';
import DisplaySelected from './DisplaySelected';
import { screen } from '@testing-library/react';
import selectEvent from 'react-select-event';

function setupTest() {
  const utils = renderWithProviders(
    <>
      <Searchbar />
      <DisplaySelected />
    </>
  );
  return {
    ...utils
  };
}

describe('if selecting an attribute from searchbar displays its name in the correct selected box with appropriate styling', () => {
  test('advantages', async () => {
    setupTest();

    await selectEvent.select(screen.getByRole('combobox'), ['Catfall']);
    expect(screen.getByRole('listitem', { name: 'Catfall' })).toBeInTheDocument();
    expect(screen.getByRole('listitem', { name: 'Catfall' })).toHaveStyle('color: seagreen');
  });

  test('disadvantages', async () => {
    const { user } = setupTest();

    await user.click(screen.getByRole('tab', { name: 'Disadvantages' }));
    await selectEvent.select(screen.getByRole('combobox'), ['Confused']);
    expect(screen.getByRole('listitem', { name: 'Confused' })).toBeInTheDocument();
    expect(screen.getByRole('listitem', { name: 'Confused' })).toHaveStyle('color: brown');
  });
});
