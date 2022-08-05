import React from 'react';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const SettingsSlice = createSlice({
  name: 'settings',
  initialState: {
    temperature: 0,
    brightness: 0,
    time: new Date(),
    formatTime: '7:00',
    wakeUpTime: new Date(),
    formatWakeUpTime: '2:11',
    volume: 0.5,
    temperatureNew: '',
    playingTime: '',
    recordingFile: '',
  },
  reducers: {
    setTemperature(state, action: PayloadAction<number>) {
      state.temperature = action.payload;
    },
    setBrightness(state, action: PayloadAction<number>) {
      state.brightness = action.payload;
    },
    setRecording(state, action: PayloadAction<any>) {
      state.recordingFile = action.payload;
    },
    setWakeUpTime(state, action: PayloadAction<any>) {
      state.wakeUpTime = action.payload.value;
      state.formatWakeUpTime = action.payload.formatValue;
    },
    setTime(state, action: PayloadAction<any>) {
      state.time = action.payload.value;
      state.formatTime = action.payload.formatValue;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    setTemperatureNew(state, action: PayloadAction<any>) {
      state.temperatureNew = action.payload;
    },
    setPlayingTime(state, action: PayloadAction<any>) {
      state.playingTime = action.payload;
    },
  },
});

export const {
  setTemperature,
  setBrightness,
  setWakeUpTime,
  setTime,
  setVolume,
  setTemperatureNew,
  setPlayingTime,
  setRecording,
} = SettingsSlice.actions;
export default SettingsSlice.reducer;
