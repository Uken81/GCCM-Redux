import React from 'react';
import { screen } from '@testing-library/react';
import { setupWithUserEvents } from 'utils/test-utils';
import CreateNewCharacterPage from './CreateNewCharacterPage';

test('if ', async () => {
  const { userAction } = setupWithUserEvents(<CreateNewCharacterPage />);
  const SearchbarTitle = screen.getByText(/Select your Characters/);
  const disadvantagesTab = screen.getByRole('tab', { name: 'Disadvantages' });

  expect(SearchbarTitle).toHaveTextContent('Select your Characters ADVANTAGES');
  await userAction.click(disadvantagesTab);
  expect(SearchbarTitle).toHaveTextContent('Select your Characters DISADVANTAGES');
});
