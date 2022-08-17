import React from 'react';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'account',
  initialState: {
    loader: false,
    email:"",
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
    nersery: {
      id: '',
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
    setDeviceIdSerialNumber(state, action: PayloadAction<any>) {
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
    setNerseryId(state, action: PayloadAction<any>) {
      state.nersery.id = action.payload;
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
  setDeviceIdSerialNumber,
  setNerseryId,
} = messageSlice.actions;
export default messageSlice.reducer;
