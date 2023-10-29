import { configureStore } from '@reduxjs/toolkit'

import usersReducer from './reducers/usersSlice';
import filtersReducer from './reducers/filtersSlice';

export const store = configureStore({
  reducer: { usersReducer, filtersReducer },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

