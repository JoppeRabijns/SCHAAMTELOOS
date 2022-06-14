import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playing1: true,
  playing2: false,
  time: 0,
  renderProgress: 0,
  holdAndContinueButton: false,
  holdAndContinueButtonActivated: false,
};

export const videoSlice = createSlice({
  name: "videoSlice",
  initialState,
  reducers: {
    setPlaying1StateTrue: (state) => {
      state.playing1 = true;
    },
    setPlaying1StateFalse: (state) => {
      state.playing1 = false;
    },
    setPlaying2StateTrue: (state) => {
      state.playing2 = true;
    },
    setPlaying2StateFalse: (state) => {
      state.playing2 = false;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    setRenderProgress: (state, action) => {
      state.renderProgress = action.payload;
    },
    setRenderStart: (state) => {
      state.renderStart = true;
    },
    setHoldAndContinueButtonTrue: (state) => {
      state.holdAndContinueButton = true;
    },
    setHoldAndContinueButtonFalse: (state) => {
      state.holdAndContinueButton = false;
    },
    setHoldAndContinueButtonActivated: (state) => {
      state.holdAndContinueButtonActivated = true;
    },
  },
});

export const {
  setPlaying1StateTrue,
  setPlaying1StateFalse,
  setPlaying2StateTrue,
  setPlaying2StateFalse,
  setTime,
  setRenderProgress,
  setRenderStart,
  setHoldAndContinueButtonTrue,
  setHoldAndContinueButtonFalse,
  setHoldAndContinueButtonActivated,
} = videoSlice.actions;

export default videoSlice.reducer;
