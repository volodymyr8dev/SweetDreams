import { combineReducers } from "redux";
import REDUCER_KEY from "./reducerKeys";

import messageReducer from '../redux/slice/slice'
import SettingsReducer from '../redux/slice/SettingsSlice';
export default () =>
  combineReducers({
    [REDUCER_KEY.LOGIN_REDUCER]: messageReducer,
    [REDUCER_KEY.SETTINGS_REDUCER]: SettingsReducer,
  });

