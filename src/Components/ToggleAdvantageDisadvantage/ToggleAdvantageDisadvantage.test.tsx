import React from 'react';
import { screen } from '@testing-library/react';
import { setupWithUserEvents } from 'utils/test-utils';
import Searchbar from 'Components/Searchbar/Searchbar';
import DisplaySelected from 'Components/Selected/Display Selected/DisplaySelected';

function setupTest() {
  const utils = setupWithUserEvents(
    <div>
      <Searchbar />
      <DisplaySelected />
    </div>
  );
  const disadvantageTab = screen.getByRole('tab', { name: 'Disadvantages' });
  const click = utils.userAction.click;

  return {
    ...utils,
    disadvantageTab,
    click
  };
}

test('if clicking on a tab will select it and deselect the other', async () => {
  const { disadvantageTab, click } = setupTest();

  await click(disadvantageTab);
  const selected = screen.getByRole('tab', { selected: true });
  const unselected = screen.getByRole('tab', { selected: false });
  expect(selected).toHaveTextContent('Disadvantages');
  expect(unselected).toHaveTextContent('Advantages');
});

test('if clicking on selected lists changes the selected tab', async () => {
  const { disadvantageTab, click } = setupTest();

  const disadvantagesList = screen.getByText('Selected Disadvantages');
  const advantageTab = screen.getByRole('tab', { name: 'Advantages' });
  expect(advantageTab).toHaveClass('nav-link active');
  expect(disadvantageTab).toHaveClass('nav-link');

  await click(disadvantagesList);
  expect(disadvantageTab).toHaveClass('nav-link active');
  expect(advantageTab).toHaveClass('nav-link');
});
