import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string[] = [];

export const startLogsSlice = createSlice({
  name: 'startLogs',
  initialState,
  reducers: {
    addStartEvent: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
      if (state.length > 4) {
        state.shift();
      }
    },
  },
});

const { addStartEvent } = startLogsSlice.actions;

export { addStartEvent };

export default startLogsSlice.reducer;