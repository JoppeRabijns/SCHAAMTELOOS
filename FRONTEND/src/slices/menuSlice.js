import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuOpen: false,
  menuHide: false,
  overDitProject: false,
  privacyPolicy: false,
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
    setOverDitProjectTrue: (state) => {
      state.overDitProject = true;
    },
    setOverDitProjectFalse: (state) => {
      state.overDitProject = false;
    },
    setPrivacyPolicyTrue: (state) => {
      state.privacyPolicy = true;
    },
    setPrivacyPolicyFalse: (state) => {
      state.privacyPolicy = false;
    },
  },
});

export const {
  setmenuOpenTrue,
  setmenuOpenFalse,
  setMenuHide,
  setOverDitProjectTrue,
  setOverDitProjectFalse,
  setPrivacyPolicyFalse,
  setPrivacyPolicyTrue,
} = menuSlice.actions;

export default menuSlice.reducer;
