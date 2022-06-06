import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuOpen: false,
  menuHide: false,
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
    setMenuHide: (state) => {
      state.menuHide = true;
    },
  },
});

export const { setmenuOpenTrue, setmenuOpenFalse, setMenuHide } =
  menuSlice.actions;

export default menuSlice.reducer;
