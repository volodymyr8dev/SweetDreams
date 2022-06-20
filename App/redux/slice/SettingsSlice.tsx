import React from 'react';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const SettingsSlice = createSlice({
  name: 'settings',
  initialState: {
    temperature: 0,
    brightness: 0,
    time: new Date(),
  },
  reducers: {
    setTemperature(state, action: PayloadAction<number>) {
      state.temperature = action.payload;
    },
    setBrightness(state, action: PayloadAction<number>) {
      state.brightness = action.payload;
    },
    setWakeUpTime(state, action: PayloadAction<number>) {
      state.time = action.payload;
    },
  },
});

export const {setTemperature, setBrightness, setWakeUpTime} = SettingsSlice.actions;
export default SettingsSlice.reducer;
