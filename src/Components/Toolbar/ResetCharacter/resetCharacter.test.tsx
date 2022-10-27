import React from 'react';
import { renderWithProviders } from 'utils/test-utils';
import GuestPage from 'Pages/GuestPage/GuestPage';
import { screen } from '@testing-library/react';
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  renderWithProviders(<GuestPage />);
});

test('if clicking on the reset character button clears all references to selected attribute', async () => {
  const searchbar = screen.getByRole('combobox');

  await selectEvent.select(searchbar, ['Clinging']);
  const deleteCharacterButton = screen.getByRole('button', { name: 'Reset Character' });
  await userEvent.click(deleteCharacterButton);
  const selectedItems = screen.queryAllByText('Clinging');
  expect(selectedItems.length).toBe(0);
});
