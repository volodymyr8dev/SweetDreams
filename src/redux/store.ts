/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage                        from '@react-native-async-storage/async-storage';
import { persistReducer }                  from 'redux-persist';
import guestMiddleware                     from './guestMiddleware';
import startLogs                           from './slices/startLogs';
import auth                                from './slices/auth';
import navigationHeader                    from './slices/navigationHeader';
import forgotPassword                      from './slices/forgotPassword';

const createFlipperDebugger = require('redux-flipper').default;

export const reducers = combineReducers({
  startLogs,
  auth,
  navigationHeader,
  forgotPassword
});

const persistConfig = {
  key:     'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(createFlipperDebugger(), guestMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootReducerState = ReturnType<typeof store.getState>;
