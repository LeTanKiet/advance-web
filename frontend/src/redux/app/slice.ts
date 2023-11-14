import { createSlice } from "@reduxjs/toolkit";

export interface AppState {}

const initialState: AppState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
});

// export const {} = counterSlice.actions;

export default counterSlice.reducer;
