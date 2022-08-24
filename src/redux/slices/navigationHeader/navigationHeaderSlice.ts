import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface navigationHeaderSliceState {
  headerTintColor: string | undefined
  headerTitleStyle: {
    fontFamily: string | undefined,
    fontSize:   number | undefined,
  },
  headerStyle: {
    backgroundColor: string | undefined,
  },
  gestureEnabled:    boolean | undefined,
  headerLeftText:    string | undefined,
  headerLeftMethod:  object | undefined,
  headerRightText:   string | undefined,
  headerRightMethod: object | undefined,
}

export const initialState: navigationHeaderSliceState = {
  headerTintColor: '#2371AB',
  headerTitleStyle: {
    fontFamily: 'AntagometricaBT-Bold',
    fontSize:   20,
  },
  headerStyle: {
    backgroundColor: '#2A305A',
  },
  gestureEnabled:    false,
  headerLeftText:    undefined,
  headerLeftMethod:  undefined,
  headerRightText:   undefined,
  headerRightMethod: undefined,
};

export const navigationHeaderSlice = createSlice({
  name: 'navigationHeader',
  initialState,
  reducers: {
    setOptions(state, action: PayloadAction<any>) {
      state = Object.assign(state, action.payload)
    },
    resetOptions: (state) => {
      state = initialState;
    },
  },
});

const { setOptions, resetOptions } = navigationHeaderSlice.actions;

export { setOptions, resetOptions };

export default navigationHeaderSlice.reducer;