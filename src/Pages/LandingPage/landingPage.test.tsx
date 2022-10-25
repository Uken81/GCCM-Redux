import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../App';
import { renderWithProviders } from '../../utils/test-utils';

afterEach(() => cleanup());

describe('navigating to', () => {
  beforeEach(() => renderWithProviders(<App />));

  test('guest page and back', async () => {
    const linkToGuest = screen.getByRole('button', { name: 'Continue as Guest' });
    await userEvent.click(linkToGuest);
    const searchBar = screen.getByText('Select...');
    expect(searchBar).toBeInTheDocument();
    const back = screen.getByRole('link', { name: 'BACK' });
    await userEvent.click(back);
    expect(screen.getByText('Continue as Guest')).toBeInTheDocument();
  });

  test('log in page', async () => {
    const linkToLogin = screen.getByRole('button', { name: 'Log-in/Sign-up' });

    await userEvent.click(linkToLogin);
    expect(screen.getByText('SIGN IN')).toBeInTheDocument();
  });
});
