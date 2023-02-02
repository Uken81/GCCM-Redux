import React from 'react';
import { screen } from '@testing-library/react';
import { App } from '../../App';
import { setupWithUserEvents } from '../../utils/test-utils';

describe('navigating to', () => {
  test('guest page and back', async () => {
    const { userAction } = setupWithUserEvents(<App />);

    const linkToGuest = screen.getByRole('button', { name: 'Continue as Guest' });
    await userAction.click(linkToGuest);
    const searchbar = screen.getByText('Select...');
    expect(searchbar).toBeInTheDocument();
    const back = screen.getByRole('link', { name: 'BACK' });
    await userAction.click(back);
    expect(screen.getByText('Continue as Guest')).toBeInTheDocument();
  });

  test('log in page', async () => {
    const { userAction } = setupWithUserEvents(<App />);

    const linkToLogin = screen.getByRole('button', { name: 'Log-in/Sign-up' });
    await userAction.click(linkToLogin);
    expect(screen.getByText('SIGN IN')).toBeInTheDocument();
  });
});
