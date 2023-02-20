import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from 'features/toggleSlice';
import characterReducer from 'features/characterSlice';

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    character: characterReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
