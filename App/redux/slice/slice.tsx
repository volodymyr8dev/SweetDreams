import React from 'react';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'account',
  initialState: {
    loader: false,
    events: {
      location: {
        name: '',
        locate: '',
      },
    },
    userInformation: {
      user: {accounts: [{}]},
      verified: false,
    },
  },
  reducers: {
    setUserInformation(state, action: PayloadAction<any>) {
      state.userInformation.user = {
        ...state.userInformation.user,
        ...action.payload,
      };
    },
    setBabyInformation(state, action: PayloadAction<any>) {
      state.userInformation.user.accounts[0] = action.payload;
    },
    updateVerifiedEmail(state, action: PayloadAction<boolean>) {
      state.userInformation = state.userInformation;
      state.userInformation.verified = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setLoader(state, action: PayloadAction<boolean>) {
      state.loader = action.payload;
    },
    setLocationEvent(state, action: PayloadAction<any>) {
      state.events.location.name = action.payload.name;
      state.events.location.locate = action.payload.location;
    },
  },
});

export const {
  setEmail,
  setLoader,
  setUserInformation,
  updateVerifiedEmail,
  setBabyInformation,
  setLocationEvent,
} = messageSlice.actions;
export default messageSlice.reducer;
