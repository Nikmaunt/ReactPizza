import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './filterSclice';
import cartSlice from './cartSclice';

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
