import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "../../types/auth";

export interface AppState {
  user: TUser | null;
}

const initialState: AppState = {
  user: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

// export const {} = appSlice.actions;

export default appSlice.reducer;
