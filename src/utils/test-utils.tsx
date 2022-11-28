import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// As a basic setup, import your same slice reducers
import characterReducer from 'features/characterSlice';
import toggleReducer from 'features/toggleSlice';
import selectedOptionsReducer from 'features/selectedOptionsSlice';
import { BrowserRouter } from 'react-router-dom';
import { RootState } from '../store';
import userEvent from '@testing-library/user-event';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  //fix any type below
  store?: any;
}

function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
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
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
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