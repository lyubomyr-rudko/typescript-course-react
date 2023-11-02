import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type TLoadingState = { loadingState: boolean };
const initialState: TLoadingState = { loadingState: false };

export const loadingState = createSlice({
  name: "loadingState",
  initialState,
  reducers: {
    setLoadingState: (state) => {
      state.loadingState = !state.loadingState;
    },
  },
});
export const { setLoadingState } = loadingState.actions;
export const selectLoadingState = (state: RootState) => state.loadingState.loadingState;
export default loadingState.reducer;
