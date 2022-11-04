import React from 'react';
import Searchbar from 'Components/Searchbar/Searchbar';
import { setupWithUserEvents } from 'utils/test-utils';
import DisplaySelected from './DisplaySelected';
import { screen } from '@testing-library/react';
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';

function setupTest() {
  const utils = setupWithUserEvents(
    <div>
      <Searchbar />
      <DisplaySelected />
    </div>
  );
  const searchbar = utils.getByRole('combobox');

  return {
    ...utils,
    searchbar
  };
}

test('if selecting an advantage displays its name in the appropriate selected box', async () => {
  const { searchbar } = setupTest();

  await selectEvent.select(searchbar, ['Catfall']);
  const selectedAdvantage = screen.getByRole('listitem');
  expect(selectedAdvantage).toHaveTextContent('Catfall');
  expect(selectedAdvantage).toHaveStyle('color: seagreen');
});

test('if selecting a disadvantage displays its name in the appropriate selected box', async () => {
  const { searchbar } = setupTest();
  const disadvantagesTab = screen.getByRole('tab', { name: 'Disadvantages' });

  await userEvent.click(disadvantagesTab);
  await selectEvent.select(searchbar, ['Confused']);
  const selectedDisadvantage = screen.getByRole('listitem');
  expect(selectedDisadvantage).toHaveTextContent('Confused');
  expect(selectedDisadvantage).toHaveStyle('color: brown');
});
