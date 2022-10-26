import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/test-utils';
// import ToggleAdvantageDisadvantage from './ToggleAdvantageDisadvantage';
import userEvent from '@testing-library/user-event';
import SearchBar from 'Components/SearchBar/SearchBar';
import DisplaySelected from 'Components/Selected/Display Selected/DisplaySelected';
import ToggleAdvantageDisadvantage from './ToggleAdvantageDisadvantage';
import { debug } from 'console';

beforeEach(() =>
  renderWithProviders(
    <div>
      <SearchBar />
      <DisplaySelected />
    </div>
  )
);
// beforeEach(() => renderWithProviders(<ToggleAdvantageDisadvantage isChoosingAdvantages={false} />));
afterEach(() => cleanup());

// test('if the tabs are correctly colored', () => {
//   renderWithProviders(<ToggleAdvantageDisadvantage isChoosingAdvantages={false} />);
//   const advantageTab = screen.getByTestId('test');
//   // const advantageTab = screen.getByRole('tab', { name: 'Advantages' });
//   console.log('AT', advantageTab);
//   debug(advantageTab);
//   // expect(advantageTab).toHaveTextContent('Choose From');
//   expect(advantageTab).toHaveStyle('color: seagreen');
// });

// test('if the display only tab is unselectable and the other two are selectable.', () => {
//   const readOnlyTab = screen.getAllByRole('tab', { name: 'Choose From' });
//   expect(readOnlyTab).toHaveAttribute('disabled');
// });

test('if clicking on tags will select it and deselect the other', async () => {
  await userEvent.click(screen.getByRole('tab', { name: 'Disadvantages' }));
  const selected = screen.getByRole('tab', { selected: true });
  const unselected = screen.getByRole('tab', { selected: false });
  expect(selected).toHaveTextContent('Disadvantages');
  expect(unselected).toHaveTextContent('Advantages');
});

//Does the below belong here or with DisplaySelected component??
//How should I render the below?? should I have an unique render here??
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
