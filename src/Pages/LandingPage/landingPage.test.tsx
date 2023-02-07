import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testSetup';
import LandingPage from './LandingPage';

function setupTest() {
  const utils = renderWithProviders(<LandingPage />);
  return { ...utils };
}

describe('navigating to', () => {
  test('guest page', async () => {
    const { user, history } = setupTest();

    expect(history.location.pathname).toBe('/');

    await user.click(screen.getByRole('button', { name: 'Continue as Guest' }));
    expect(history.location.pathname).toBe('/guest-page');
  });

  test('log in page', async () => {
    const { user, history } = setupTest();

    expect(history.location.pathname).toBe('/');

    await user.click(screen.getByRole('button', { name: 'Log in/Sign up' }));
    expect(history.location.pathname).toBe('/sign-in-and-sign-up');
  });
});
