import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playing: true,
  time: 0,
  renderProgress: 0,
  holdAndContinueButton: false,
  holdAndContinueButtonActivated: false,
};

export const videoSlice = createSlice({
  name: "videoSlice",
  initialState,
  reducers: {
    setPlayingStateTrue: (state) => {
      state.playing = true;
    },
    setPlayingStateFalse: (state) => {
      state.playing = false;
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
  setPlayingStateTrue,
  setPlayingStateFalse,
  setTime,
  setRenderProgress,
  setRenderStart,
  setHoldAndContinueButtonTrue,
  setHoldAndContinueButtonFalse,
  setHoldAndContinueButtonActivated,
} = videoSlice.actions;

export default videoSlice.reducer;
