import React from 'react';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'account',
  initialState: {
    email: '',
    loader: false,
  },
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setLoader(state, action: PayloadAction<boolean>) {
      state.loader = action.payload;
    },
  },
});

export const {setEmail,setLoader} = messageSlice.actions;
export default messageSlice.reducer;
