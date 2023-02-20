import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// As a basic setup, import your same slice reducers
import characterReducer from 'features/characterSlice';
import toggleReducer from 'features/toggleSlice';
import { RootState } from '../store';
import { UserContextProvider } from './mockContextProvider';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: EnhancedStore;
  initialEntry?: string;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      toggle: {
        isChoosingAdvantages: true
      },
      character: {
        name: '',
        advantages: [],
        disadvantages: [],
        id: ''
      }
    },
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        character: characterReducer,
        toggle: toggleReducer
      },
      preloadedState
    }),
    initialEntry = '/',
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  type Props = {
    children: ReactNode;
  };
  function Wrapper({ children }: Props): JSX.Element {
    return (
      <UserContextProvider>
        <Router location={history.location} navigator={history}>
          <Provider store={store}>{children}</Provider>
        </Router>
      </UserContextProvider>
    );
  }
  const history = createMemoryHistory({ initialEntries: [initialEntry] });

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    user: userEvent.setup(),
    history,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  };
}
