import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from 'App';
import { renderWithProviders } from 'utils/test-utils';
import LandingPage from './LandingPage';

afterEach(() => cleanup());

test('Should render page with header and two buttons', () => {
  renderWithProviders(<LandingPage />);

  const header = screen.getByText('G.C.C.M');
  const linkButton1 = screen.getByRole('button', { name: 'Log-in/Sign-up' });
  const linkButton2 = screen.getByRole('button', { name: 'Continue as Guest' });
  expect(header).toBeInTheDocument();
  expect(linkButton1).toBeInTheDocument();
  expect(linkButton2).toBeInTheDocument();
});

describe('navigate to', () => {
  beforeEach(() => renderWithProviders(<App />));

  test('guest page and back', async () => {
    const linkToGuest = screen.getByRole('button', { name: 'Continue as Guest' });
    await userEvent.click(linkToGuest);
    const searchBar = screen.getByText('Select...');
    expect(searchBar).toBeInTheDocument();
    // expect(screen.getByText('Select...')).toBeInTheDocument();
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
