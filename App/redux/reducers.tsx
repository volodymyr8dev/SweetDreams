import { combineReducers } from "redux";
import REDUCER_KEY from "./reducerKeys";

import LoginReducer from '../components/Login/redux/reducer'
import messageReducer from '../redux/slice/slice'
export default () =>
  combineReducers({
    [REDUCER_KEY.LOGIN_REDUCER]: messageReducer,
  });

