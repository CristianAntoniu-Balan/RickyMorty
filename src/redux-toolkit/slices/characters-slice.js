import { createSlice, combineReducers } from '@reduxjs/toolkit';

import charactersReducer from '../reducers/characters-reducer';
import pageReducer from '../reducers/page-reducer';
import pageSliceReducer from './page-slice';
import { initialState as chararctersInitialState } from '../reducers/characters-reducer';
import { initialState as pageInitialState } from './page-slice';

console.log(pageSliceReducer);

const charactersSlice = createSlice({
   name: 'charactersSlice',
   initialState: {
      ...chararctersInitialState,
      ...pageInitialState,
   },
   reducers: pageSliceReducer,
   extraReducers: {},
});

export const characterSliceActions = charactersSlice.actions;
export default charactersSlice.reducer;
