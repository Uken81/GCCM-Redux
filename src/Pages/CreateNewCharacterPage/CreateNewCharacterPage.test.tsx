import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders, setupWithUserEvents } from 'utils/test-utils';
import CreateNewCharacterPage from './CreateNewCharacterPage';
import { store } from 'store';
import { setName } from 'features/characterSlice';

function setupTest() {
  //   const utils = setupWithUserEvents(<CreateNewCharacterPage />, {
  //     preloadedState: {
  //       toggle: {
  //         isChoosingAdvantages: true
  //       },
  //       options: {
  //         selectedOptions: []
  //       },
  //       character: {
  //         name: '',
  //         advantages: [],
  //         disadvantages: [],
  //         id: ''
  //       }
  //     }
  //   });
  //   const form = screen.getByTestId('form');
  //   const nameInput = screen.getByRole('textbox', { name: 'character-name-form' });
  //   const typeName = () => utils.userAction.type(nameInput, 'character name');
  //   return {
  //     ...utils,
  //     form,
  //     typeName
  //   };
}

test('if searchbar heading changes when a characters name is submitted', async () => {
  const utils = setupWithUserEvents(<CreateNewCharacterPage />, {
    preloadedState: { character: { name: 'test', advantages: [], disadvantages: [], id: '' } }
  });
  console.log('utils', utils.store.getState());
});
