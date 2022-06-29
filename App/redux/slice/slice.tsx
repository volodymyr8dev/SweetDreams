import React from 'react';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'account',
  initialState: {
    email: '',
    loader: false,
    userInformation: {
      user:{},
      verified: false,
    },
  },
  reducers: {
    setUserInformation(state, action: PayloadAction<any>) {
      state.userInformation.user = action.payload;
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

export const {setEmail, setLoader, setUserInformation, updateVerifiedEmail} =
  messageSlice.actions;
export default messageSlice.reducer;
