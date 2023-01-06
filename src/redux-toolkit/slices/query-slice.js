import { createSlice } from '@reduxjs/toolkit';

import { api, apiOptions } from '../../config/stringsURL';
import { tableConfig } from '../../config/stringsTable';

export const name = 'query';

let initialState = {};

function reset(queryFor) {
   let empty = {};
   Object.keys(api[queryFor].queryBy).forEach((queryKey) => {
      // console.log(tableConfig[queryFor].find((el) => el.id === queryKey));
      Object.assign(empty, {
         [queryKey]: '',
      });
   });
   return empty;
}

(() => {
   Object.keys(apiOptions).forEach((key) => {
      initialState[key] = { ...reset(key) };
   });
})();

const reducers = {
   resetQuery: (state, action) => ({
      ...state,
      [action.payload.context]: { ...reset(action.payload.context) },
   }),
   updateQueryItem: (state, action) => {
      state[action.payload.context][action.payload.id] = action.payload.value;
   },
   default: (state) => state,
};

const querySlice = createSlice({ name, initialState, reducers });

export const { resetQuery, updateQueryItem } = querySlice.actions;

export default querySlice.reducer;
