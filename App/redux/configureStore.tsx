import {createStore, combineReducers} from 'redux';
import configureReducers from './reducers';

const configureStore = () => {
  const reducer = configureReducers();
  return createStore(reducer);
};
export type RootState = ReturnType<typeof configureReducers>;

export const store = configureStore();
