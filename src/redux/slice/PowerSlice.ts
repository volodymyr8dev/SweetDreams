import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const PowerSlice = createSlice({
  name: 'power',
  initialState: {
    power: true,
    isConnected: false,
    CarouselItem: '',
  },
  reducers: {
    setPower(state, action: PayloadAction<boolean>) {
      state.power = action.payload;
    },
    setConnection(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
  },
});

export const {setPower, setConnection} = PowerSlice.actions;
export default PowerSlice.reducer;
