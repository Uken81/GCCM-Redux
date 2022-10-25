import React from 'react';
import { cleanup, fireEvent, logRoles, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import GuestPage from './GuestPage';
import { renderWithProviders } from '../../utils/test-utils';
import selectEvent from 'react-select-event';
import ToggleAdvantageDisadvantage from 'Components/ToggleAdvantageDisadvantage/ToggleAdvantageDisadvantage';
import Header from 'Components/Header/Header.component';

// beforeEach(() => renderWithProviders(<GuestPage />));
// afterEach(() => cleanup());

// test('If clicking on tags will select it and deselect other', async () => {
//   await userEvent.click(screen.getByRole('tab', { name: 'Disadvantages' }));
//   const selected = screen.getByRole('tab', { selected: true });
//   const unselected = screen.getByRole('tab', { selected: false });
//   expect(selected).toHaveTextContent('Disadvantages');
//   expect(unselected).toHaveTextContent('Advantages');
// });

// test('If clicking on Disadvantages tab changes heading and search options', async () => {
//   const searchBar = screen.getByRole('combobox');
//   const searchBarHeader = screen.getByText(/Select your Characters/);
//   const disadvantagesTab = screen.getByRole('tab', { name: 'Disadvantages' });

//   expect(searchBarHeader).toHaveTextContent('Select your Characters ADVANTAGES');

//   await userEvent.click(disadvantagesTab);
//   expect(searchBarHeader).toHaveTextContent('Select your Characters DISADVANTAGES');
//   selectEvent.openMenu(searchBar);
//   expect(screen.getByText('Amnesia')).toBeInTheDocument();
// });

// test('if clicking on selected lists changes the selected tab', async () => {
//   const disadvantagesList = screen.getByText('Selected Disadvantages');
//   const disadvantageTab = screen.getByRole('tab', { name: 'Disadvantages' });
//   const advantageTab = screen.getByRole('tab', { name: 'Advantages' });

//   expect(advantageTab).toHaveClass('nav-link active');
//   expect(disadvantageTab).toHaveClass('nav-link');

//   await userEvent.click(disadvantagesList);
//   expect(disadvantageTab).toHaveClass('nav-link active');
//   expect(advantageTab).toHaveClass('nav-link');
// });

// describe('Searchbar', () => {
//   // const searchBar = screen.getByRole('combobox');

//   test('If searchBar dropdown menu appears when focused', () => {
//     const searchBar = screen.getByRole('combobox');

//     expect(screen.queryByText('Affliction')).toBeNull();
//     selectEvent.openMenu(searchBar);
//     expect(screen.getByText('Affliction')).toBeInTheDocument();
//   });

//   test('If Searchbar results are empty until an option is selected', async () => {
//     const searchBar = screen.getByRole('combobox');

//     expect(screen.queryByDisplayValue('Affliction')).not.toBeInTheDocument();

//     await selectEvent.select(searchBar, ['Affliction']);
//     const selectedOption = screen.getByTestId('items-container');
//     expect(selectedOption).toBeInTheDocument();
//   });

//   test('If Muliselect works and items are in slected order', async () => {
//     const searchBar = screen.getByRole('combobox');

//     expect(screen.queryAllByTestId('items-container').length).toBe(0);

//     await selectEvent.select(searchBar, ['Affliction', 'Acute Senses', 'Catfall']);
//     expect(screen.queryAllByTestId('items-container').length).toBe(3);
//   });
// });
