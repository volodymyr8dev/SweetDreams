import React from 'react';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'account',
  initialState: {
    loader: false,
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
  },
});

export const {
  setEmail,
  setLoader,
  setUserInformation,
  updateVerifiedEmail,
  setBabyInformation,
} = messageSlice.actions;
export default messageSlice.reducer;
