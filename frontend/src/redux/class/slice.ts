import { createSlice } from "@reduxjs/toolkit";
import { TClass } from "../../types/class";

export interface ClassState {
  list: TClass[];
}

const initialState: ClassState = {
  list: [],
};

export const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    setClassList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const classActions = classSlice.actions;

export default classSlice.reducer;
