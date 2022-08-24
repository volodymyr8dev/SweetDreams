import {combineReducers} from 'redux';
import REDUCER_KEY from './reducerKeys';

import messageReducer   from './slice';
import SettingsReducer from './slice/SettingsSlice';
import PowerSlice      from './slice/PowerSlice';

export default () =>
  combineReducers({
    [REDUCER_KEY.LOGIN_REDUCER]: messageReducer,
    [REDUCER_KEY.SETTINGS_REDUCER]: SettingsReducer,
    [REDUCER_KEY.POWER_REDUCER]: PowerSlice,
  });
