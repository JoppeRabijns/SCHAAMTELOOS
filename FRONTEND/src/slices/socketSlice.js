import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
};

export const socketSlice = createSlice({
  name: "socketSlice",
  initialState,
  reducers: {
    addSocketId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { addSocketId } = socketSlice.actions;

export default socketSlice.reducer;
