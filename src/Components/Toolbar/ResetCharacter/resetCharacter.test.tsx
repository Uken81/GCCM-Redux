import React from 'react';
import { setupWithUserEvents } from 'utils/testSetup';
import GuestPage from 'Pages/GuestPage/GuestPage';
import { screen } from '@testing-library/react';
import selectEvent from 'react-select-event';

test('if clicking on the reset character button clears all references to selected attribute', async () => {
  const { userAction } = setupWithUserEvents(<GuestPage />);
  const searchbar = screen.getByRole('combobox');

  await selectEvent.select(searchbar, ['Clinging']);
  const resetCharacterButton = screen.getByRole('button', { name: 'Reset Character' });
  await userAction.click(resetCharacterButton);
  const selectedItems = screen.queryAllByText('Clinging');
  expect(selectedItems.length).toBe(0);
});
