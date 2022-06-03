import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuOpen: false,
};

export const menuSlice = createSlice({
  name: "videoSlice",
  initialState,
  reducers: {
    setmenuOpenTrue: (state) => {
      state.menuOpen = true;
    },
    setmenuOpenFalse: (state) => {
      state.menuOpen = false;
    },
  },
});

export const { setmenuOpenTrue, setmenuOpenFalse } = menuSlice.actions;

export default menuSlice.reducer;
