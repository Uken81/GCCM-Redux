import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from 'features/toggleSlice';
import selectedOptionsReducer from 'features/selectedOptionsSlice';

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    options: selectedOptionsReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
