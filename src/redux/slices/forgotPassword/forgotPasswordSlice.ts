import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface forgotPasswordSliceState {
  email: string | undefined,
}

export const initialState: forgotPasswordSliceState = {
  email: undefined,
};

export const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<any>) {
      state.email = action.payload
    },
    resetEmail: (state) => {
      state.email = undefined;
    },
  },
});

const { setEmail, resetEmail } = forgotPasswordSlice.actions;

export { setEmail, resetEmail };

export default forgotPasswordSlice.reducer;