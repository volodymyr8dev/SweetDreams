import {createStore, combineReducers} from 'redux';
import configureReducers from './reducers';

const configureStore = () => {
  const reducer = configureReducers();
  return createStore(reducer);
};

export const store = configureStore();
