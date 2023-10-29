import {configureStore} from "@reduxjs/toolkit";
import usersSlice from "./usersSlice.ts";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import filterSlice from "./filterSlice.ts";

const store = configureStore({
  reducer: {
    users: usersSlice,
    filters: filterSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store

