import { cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { renderWithProviders } from 'utils/test-utils';
import GuestPage from './GuestPage';

beforeEach(() => renderWithProviders(<GuestPage />));
afterEach(() => cleanup());

test('Should correctly render default headers', () => {
  //   const pageHeader = screen.getByText('G.C.C.M');
  const pageHeader = screen.getByRole('heading`', { name: 'G.C.C.M' });
  const searchBarHeader = screen.getByText(/^Select your Characters/);
  const selectedHeader1 = screen.getByText('Selected Advantages');
  const selectedHeader2 = screen.getByText('Selected Disadvantages');

  expect(pageHeader).toBeInTheDocument();
  expect(searchBarHeader).toHaveTextContent('Select your Characters ADVANTAGES');
  expect(selectedHeader1).toBeInTheDocument();
  expect(selectedHeader2).toBeInTheDocument();
});

test('Toolbar buttons should be correctly rendered', () => {
  const button1 = screen.getByRole('button', { name: 'Reset Character' });
  const button2 = screen.getByRole('button', { name: 'Download PDF' });
  const button3 = screen.getByRole('button', { name: 'Copy to Clipboard' });

  expect(button1).toBeInTheDocument();
  expect(button2).toBeInTheDocument();
  expect(button3).toBeInTheDocument();
});

test('Searchbar should render with tabs', () => {
  const searchBar = screen.getByText('Select...');
  const tab1 = screen.getByRole('tab', { name: 'Choose From' });
  const tab2 = screen.getByRole('tab', { name: 'Advantages' });
  const tab3 = screen.getByRole('tab', { name: 'Disadvantages' });

  expect(searchBar).toBeInTheDocument();
  expect(tab1).toBeInTheDocument();
  expect(tab2).toBeInTheDocument();
  expect(tab3).toBeInTheDocument();
});

// test('Link with text Back should be rendered', () => {
//   const link = screen.getByRole('link');

//   expect(link).toBeInTheDocument();
// });
