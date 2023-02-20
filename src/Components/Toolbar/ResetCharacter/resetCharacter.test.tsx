import React from 'react';
import GuestPage from 'Pages/GuestPage/GuestPage';
import { screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/testSetup';

function setupTest() {
  const utils = renderWithProviders(<GuestPage />, {
    preloadedState: {
      toggle: {
        isChoosingAdvantages: true
      },
      character: {
        name: 'test character',
        advantages: ['Clinging'],
        disadvantages: ['Greed'],
        id: ''
      }
    }
  });
  return { ...utils };
}

test('if clicking on the reset character button clears all references to selected attribute', async () => {
  const { user } = setupTest();

  await user.click(screen.getByRole('button', { name: 'Reset Character' }));
  expect(screen.queryByText('test character')).not.toBeInTheDocument();
  expect(screen.queryByText('Clinging')).not.toBeInTheDocument();
  expect(screen.queryByText('Greed')).not.toBeInTheDocument();
});
