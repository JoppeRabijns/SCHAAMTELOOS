import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "not initiated",
};

export const callSlice = createSlice({
  name: "callSlice",
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { changeStatus } = callSlice.actions;

export default callSlice.reducer;
