import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  linkedIn: false,
  spotify: false,
  strava: false,
  fingerprint: false,
  facebook: false,
  instagram: false,
  phonenumber: false,
  scrapingFinished: false,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addLinkedinData: (state, action) => {
      state.linkedIn = action.payload;
    },
    addStravaData: (state, action) => {
      state.strava = action.payload;
    },
    addSpotifyData: (state, action) => {
      state.spotify = action.payload;
    },
    addFingerprintData: (state, action) => {
      state.fingerprint = action.payload;
    },
    addFacebookData: (state, action) => {
      state.facebook = action.payload;
    },
    addInstagramData: (state, action) => {
      state.instagram = action.payload;
    },
    setPhonenumber: (state, action) => {
      state.phonenumber = action.payload;
    },
    setScrapingFinishedTrue: (state) => {
      state.scrapingFinished = true;
    },
  },
});

export const {
  addLinkedinData,
  addStravaData,
  addSpotifyData,
  addFingerprintData,
  addFacebookData,
  addInstagramData,
  setPhonenumber,
  setScrapingFinishedTrue,
} = dataSlice.actions;

export default dataSlice.reducer;
