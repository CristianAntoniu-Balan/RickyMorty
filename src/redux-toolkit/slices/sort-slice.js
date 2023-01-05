import { createSlice } from '@reduxjs/toolkit';

import { apiOptions } from '../../config/stringsURL';

export const name = 'sort';

let initialState = {};
(() => {
   Object.keys(apiOptions).forEach(
      (key) =>
         (initialState[key] = {
            sortBy: 'id',
            sortType: 1,
         })
   );
})();

const reducers = {
   sort: (state, action) => {
      if (state[action.payload.context].sortBy === action.payload.sortBy) {
         state[action.payload.context].sortType =
            -1 * state[action.payload.context].sortType;
      } else {
         state[action.payload.context].sortBy = action.payload.sortBy;
         state[action.payload.context].sortType = 1;
      }
   },
   updateSort: (state, action) => {
      state[action.payload.context].sortBy = action.payload.sortBy;
      state[action.payload.context].sortType = Number(action.payload.sortType);
   },
   default: (state) => state,
};

const sortSlice = createSlice({ name, initialState, reducers });

export const { sort, updateSort } = sortSlice.actions;

export default sortSlice.reducer;
