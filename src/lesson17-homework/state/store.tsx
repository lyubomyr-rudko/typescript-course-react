import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import usersListReducer from "./slices/usersListSlice";
import loaidingStateReducer from "./slices/loaidingStateSlice";

export const store = configureStore({
  reducer: {
    usersList: usersListReducer,
    loadingState: loaidingStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
