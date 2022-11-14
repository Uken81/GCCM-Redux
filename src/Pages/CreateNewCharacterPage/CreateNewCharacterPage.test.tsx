import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { setupWithUserEvents } from 'utils/test-utils';
import CreateNewCharacterPage from './CreateNewCharacterPage';

function setupTest() {
  const utils = setupWithUserEvents(<CreateNewCharacterPage />);
  const form = utils.getByTestId('form');
  const nameInput = utils.getByRole('textbox', { name: 'character-name-form' });
  const typeName = () => utils.userAction.type(nameInput, 'character name');

  return {
    ...utils,
    form,
    typeName
  };
}

test('if searchbar heading changes when a characters name is submitted', async () => {
  const { form, typeName } = setupTest();
  const searchbarHeading = screen.getByText(/Select your Characters/);

  await typeName();
  fireEvent.submit(form);
  expect(searchbarHeading).toHaveTextContent("SELECT CHARACTER NAME'S ADVANTAGES");
});
