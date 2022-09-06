import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage                                     from '@react-native-async-storage/async-storage';
import {getProfile}                                     from '../../../api/Profile/Profile';
import {PatchDevice, FetchLatestConfig}                 from '../../../api/Device/Device';
export interface DeviceConfigItem {
  /* Version 1 */
  light_show:                   string | undefined;
  child_lock:                   boolean | undefined;
  time:                         string | undefined;
  time_set_up_automatically:    boolean | undefined;
  wake_up_time:                 string | undefined;
  dome_brightness:              number | undefined;
  temperature:                  string | undefined;

  /* Version 2 */
  display_brightness:           number | undefined;
  smart_cry_censor_enabled:     boolean | undefined;
  smart_cry_censor_sensibility: boolean | undefined;
  custom_recording:             number | undefined;
  sound_playing_time:           string | undefined;
  volume:                       number | undefined;
}
export interface DeviceItem {
  id:                                              number | undefined;
  serial_number:                                   string | undefined;
  is_connected:                                    boolean | undefined;
  is_online:                                       boolean | undefined;
  is_deluxe:                                       boolean | undefined;
  has_smart_sensor_actiation_notifcations_enabled: boolean | undefined;
  has_temperature_notifications_enabled:           boolean | undefined;
  current_temperature:                             number | undefined;
  config:                                          DeviceConfigItem;
}

export interface AccountItem {
  id:                 number | undefined;
  baby_name:          string;
  baby_gender:        string;
  baby_date_of_birth: string;
  devices:            DeviceItem[];
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
    setDeviceOnlineStatus: (state, action: PayloadAction<any>) => {
      if (state.user?.accounts[0]?.devices[0]) {
        state.user.accounts[0].devices[0].is_online = action.payload;

        PatchDevice(state.user.accounts[0].id, state.user.accounts[0].devices[0].id, {
          "is_online": action.payload
        });
      }
    },
    setDeviceLightShow: (state, action: PayloadAction<any>) => {
      if (state.user?.accounts[0]?.devices[0]?.config) {
        state.user.accounts[0].devices[0].config.light_show = action.payload;

        PatchDevice(state.user.accounts[0].id, state.user.accounts[0].devices[0].id, {
          "light_show": action.payload
        });
      }
    },
    setTemperatureNotifications: (state, action: PayloadAction<any>) => {
      if (state.user?.accounts[0]?.devices[0]) {
        state.user.accounts[0].devices[0].has_temperature_notifications_enabled = action.payload;

        PatchDevice(state.user.accounts[0].id, state.user.accounts[0].devices[0].id, {
          "has_temperature_notifications_enabled": action.payload
        });
      }
    },
    setDeviceConfigChildLock: (state, action: PayloadAction<any>) => {
      if (state.user?.accounts[0]?.devices[0]?.config) {
        state.user.accounts[0].devices[0].config.child_lock = action.payload;

        PatchDevice(state.user.accounts[0].id, state.user.accounts[0].devices[0].id, {
          "child_lock": action.payload
        });
      }
    },
    setTemperature: (state, action: PayloadAction<any>) => {
      if (state.user?.accounts[0]?.devices[0]?.config) {
        state.user.accounts[0].devices[0].config.temperature = action.payload;

        PatchDevice(state.user.accounts[0].id, state.user.accounts[0].devices[0].id, {
          "temperature": action.payload
        });
      }
    },
    setDomeBrightness: (state, action: PayloadAction<any>) => {
      if (state.user?.accounts[0]?.devices[0]?.config) {
        state.user.accounts[0].devices[0].config.dome_brightness = action.payload;

        PatchDevice(state.user.accounts[0].id, state.user.accounts[0].devices[0].id, {
          "dome_brightness": action.payload
        });
      }
    },
    setWakeUpTime: (state, action: PayloadAction<any>) => {
      if (state.user?.accounts[0]?.devices[0]?.config) {
        state.user.accounts[0].devices[0].config.wake_up_time = action.payload;

        PatchDevice(state.user.accounts[0].id, state.user.accounts[0].devices[0].id, {
          "wake_up_time": action.payload
        });
      }
    },
    setTime: (state, action: PayloadAction<any>) => {
      if (state.user?.accounts[0]?.devices[0]?.config) {
        state.user.accounts[0].devices[0].config.time = action.payload;

        PatchDevice(state.user.accounts[0].id, state.user.accounts[0].devices[0].id, {
          "time": action.payload
        });
      }
    },
    setTimeAutomatically: (state, action: PayloadAction<any>) => {
      if (state.user?.accounts[0]?.devices[0]?.config) {
        state.user.accounts[0].devices[0].config.time_set_up_automatically = action.payload;

        PatchDevice(state.user.accounts[0].id, state.user.accounts[0].devices[0].id, {
          "time_set_up_automatically": action.payload
        });
      }
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
      state.loadingCheckLogin  = false;

      state.user.email         = action.payload.user.email;
      state.user.name          = action.payload.user.name;
      state.user.gender        = action.payload.user.gender;
      state.user.date_of_birth = action.payload.user.date_of_birth;
      state.user.accounts      = action.payload.user.accounts.length > 0 ? action.payload.user.accounts : [];
    });

    builder.addCase(fetchDeviceConfig.fulfilled, (state, action) => {
      if (state.user?.accounts[0]?.devices[0]?.id) {
        state.user.accounts[0].devices[0].is_online                                       = action.payload.is_online;
        state.user.accounts[0].devices[0].is_deluxe                                       = action.payload.is_deluxe;
        state.user.accounts[0].devices[0].has_smart_sensor_actiation_notifcations_enabled = action.payload.has_smart_sensor_actiation_notifcations_enabled;
        state.user.accounts[0].devices[0].has_temperature_notifications_enabled           = action.payload.has_temperature_notifications_enabled;

        state.user.accounts[0].devices[0].current_temperature                             = action.payload.current_temperature;

        state.user.accounts[0].devices[0].config.light_show                               = action.payload.config.light_show;
        state.user.accounts[0].devices[0].config.child_lock                               = action.payload.config.child_lock;
        state.user.accounts[0].devices[0].config.dome_brightness                          = action.payload.config.dome_brightness;
        state.user.accounts[0].devices[0].config.wake_up_time                             = action.payload.config.wake_up_time;
        state.user.accounts[0].devices[0].config.time                                     = action.payload.config.time;
        state.user.accounts[0].devices[0].config.temperature                              = action.payload.config.temperature;
        state.user.accounts[0].devices[0].config.time_set_up_automatically                = action.payload.config.time_set_up_automatically;
      }
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

const fetchDeviceConfig = createAsyncThunk('auth/fetchDeviceConfig', async (_params, { rejectWithValue }) => {
    return await FetchLatestConfig(
      _params.accountId,
      _params.deviceId
    )
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.error('[FETCH DEVICE CONFIG] Data incorrect');

      return rejectWithValue('');
    });
});

const {
  setUserInformation,
  clearUserInformation,
  setDeviceOnlineStatus,
  setDeviceLightShow,
  setTemperatureNotifications,
  setDeviceConfigChildLock,
  setTemperature,
  setDomeBrightness,
  setWakeUpTime,
  setTime,
  setTimeAutomatically
} = authSlice.actions;

export {
  setUserInformation,
  clearUserInformation,
  setDeviceOnlineStatus,
  setDeviceLightShow,
  setTemperatureNotifications,
  setDeviceConfigChildLock,
  setTemperature,
  setDomeBrightness,
  setWakeUpTime,
  setTime,
  setTimeAutomatically,
  checkLogin,
  fetchDeviceConfig
};

export default authSlice.reducer;