import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage                                     from '@react-native-async-storage/async-storage';
import {getProfile}                                     from '../../../api/Profile/Profile';

export interface DeviceItem {
  id:            number | undefined;
  serial_number: string | undefined;
}

export interface AccountItem {
  id:                 number | undefined;
  baby_name:          string;
  baby_gender:        string;
  baby_date_of_birth: string;
  is_deluxe:          boolean;
  device:             DeviceItem | undefined;
};

export interface AuthSliceState {
  loadingCheckLogin: boolean;
  user: {
    email:         string | undefined;
    name:          string | undefined;
    gender:        string | undefined;
    date_of_birth: string | undefined;
    accounts:      AccountItem[];
  },
  verified: boolean;
}

export const initialState: AuthSliceState = {
  loadingCheckLogin: false,
  user: {
    email:         undefined,
    name:          undefined,
    gender:        undefined,
    date_of_birth: undefined,
    accounts: []
  },
  verified: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInformation(state, action: PayloadAction<any>) {
      const data = action.payload;

      state.user.email         = data.user.email;
      state.user.name          = data.user.name;
      state.user.gender        = data.user.gender;
      state.user.date_of_birth = data.user.date_of_birth;
      state.user.accounts      = data.user.accounts.length > 0 ? data.user.accounts : [];
    },
    clearUserInformation: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkLogin.pending, (state) => {
     state.loadingCheckLogin = true;
    });

    builder.addCase(checkLogin.rejected, (state) => {
      state.loadingCheckLogin = false;

      state.user.email         = undefined;
      state.user.name          = undefined;
      state.user.gender        = undefined;
      state.user.date_of_birth = undefined;
      state.user.accounts      = [];
    });

    builder.addCase(checkLogin.fulfilled, (state, action) => {
      state.loadingCheckLogin = false;

      state.user.email         = action.payload.user.email;
      state.user.name          = action.payload.user.name;
      state.user.gender        = action.payload.user.gender;
      state.user.date_of_birth = action.payload.user.date_of_birth;
      state.user.accounts      = action.payload.user.accounts.length > 0 ? action.payload.user.accounts : [];
    });
  },
});

const checkLogin = createAsyncThunk('auth/checkLogin', async (_params, { rejectWithValue }) => {
  let token = AsyncStorage.getItem('_login_token');

  if (token) {
    console.log('[CHECK LOGIN] Token found', token);
    return await getProfile().then(res => {
      console.log('[CHECK LOGIN] Token correct', token);

      return res.data;
    })
    .catch(err => {
      console.error('[CHECK LOGIN] Token incorrect', token);

      AsyncStorage.removeItem('_login_token');

      return rejectWithValue('');
    });
  } else {
    console.info('[CHECK LOGIN] Token not found');

    return rejectWithValue('');
  }
});

const { setUserInformation, clearUserInformation } = authSlice.actions;

export { setUserInformation, clearUserInformation, checkLogin };

export default authSlice.reducer;