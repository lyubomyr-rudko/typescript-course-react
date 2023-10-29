import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import reducer from './reducer';

export const store = configureStore({
  reducer: reducer,
});

export type RootStore = typeof store;
export type GetRootState = typeof store.getState;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
