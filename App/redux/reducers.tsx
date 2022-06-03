import { combineReducers } from "redux";
import REDUCER_KEY from "./reducerKeys";

import LoginReducer from '../components/Login/redux/reducer'

export default () =>
  combineReducers({
    REDUCER_KEY:LoginReducer,
  });

