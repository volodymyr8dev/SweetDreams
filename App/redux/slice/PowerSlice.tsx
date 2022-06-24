import React from 'react';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const PowerSlice = createSlice({
  name: 'power',
  initialState: {
    power: true,
  },
  reducers: {
    setPower(state, action: PayloadAction<boolean>) {
      state.power = action.payload;
    },
  },
});

export const {setPower} = PowerSlice.actions;
export default PowerSlice.reducer;
