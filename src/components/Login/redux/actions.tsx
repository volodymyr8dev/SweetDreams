import {createRoutine} from 'redux-saga-routines'

import {GET_DATA} from './constants'
export const getData = createRoutine(GET_DATA)