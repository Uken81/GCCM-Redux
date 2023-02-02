import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// As a basic setup, import your same slice reducers
import characterReducer from 'features/characterSlice';
import toggleReducer from 'features/toggleSlice';
import selectedOptionsReducer from 'features/selectedOptionsSlice';
import { BrowserRouter, Router } from 'react-router-dom';
import { RootState } from '../store';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { UserContextProvider } from './mockContextProvider';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  //fix any type below
  store?: EnhancedStore;
}

function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      toggle: {
        isChoosingAdvantages: true
      },
      options: {
        selectedOptions: []
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
        toggle: toggleReducer,
        options: selectedOptionsReducer
      },
      preloadedState
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  type Props = {
    children: ReactNode;
  };
  function Wrapper({ children }: Props): JSX.Element {
    // const history = createMemoryHistory({ initialEntries: ['/create-or-manage-page'] });
    return (
      <UserContextProvider>
        <BrowserRouter>
          {/* <Router location={history.location} navigator={history}> */}
          <Provider store={store}>{children}</Provider>
          {/* </Router> */}
        </BrowserRouter>
      </UserContextProvider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function setupWithUserEvents(jsx: JSX.Element) {
  const userAction = userEvent.setup();
  const utils = renderWithProviders(jsx);
  return {
    userAction,
    ...utils
  };
}
