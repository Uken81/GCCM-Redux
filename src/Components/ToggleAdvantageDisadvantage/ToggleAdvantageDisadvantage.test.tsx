import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/test-utils';
import userEvent from '@testing-library/user-event';
import SearchBar from 'Components/SearchBar/SearchBar';
import DisplaySelected from 'Components/Selected/Display Selected/DisplaySelected';

beforeEach(() =>
  renderWithProviders(
    <div>
      <SearchBar />
      <DisplaySelected />
    </div>
  )
);

afterEach(() => cleanup());

test('if clicking on tags will select it and deselect the other', async () => {
  await userEvent.click(screen.getByRole('tab', { name: 'Disadvantages' }));
  const selected = screen.getByRole('tab', { selected: true });
  const unselected = screen.getByRole('tab', { selected: false });
  expect(selected).toHaveTextContent('Disadvantages');
  expect(unselected).toHaveTextContent('Advantages');
});

test('if clicking on selected lists changes the selected tab', async () => {
  const disadvantagesList = screen.getByText('Selected Disadvantages');
  const disadvantageTab = screen.getByRole('tab', { name: 'Disadvantages' });
  const advantageTab = screen.getByRole('tab', { name: 'Advantages' });

  expect(advantageTab).toHaveClass('nav-link active');
  expect(disadvantageTab).toHaveClass('nav-link');

  await userEvent.click(disadvantagesList);
  expect(disadvantageTab).toHaveClass('nav-link active');
  expect(advantageTab).toHaveClass('nav-link');
});
