import { cleanup, screen } from '@testing-library/react';
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
