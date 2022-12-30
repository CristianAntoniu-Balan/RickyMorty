import { createSlice } from '@reduxjs/toolkit';

import { apiOptions } from '../../config/stringsURL';

const name = 'sort';

let initialState = {};
(() => {
   Object.keys(apiOptions).forEach(
      (key) =>
         (initialState[key] = {
            by: 'id',
            type: 1,
         })
   );
})();

const reducers = {
   sort: (state, action) => {
      if (state[action.payload.context].by === action.payload.by) {
         state[action.payload.context].type =
            -1 * state[action.payload.context].type;
      } else {
         state[action.payload.context].by = action.payload.by;
         state[action.payload.context].type = 1;
      }
   },
   default: (state) => state,
};

const sortSlice = createSlice({ name, initialState, reducers });

export const { sort } = sortSlice.actions;

export default sortSlice.reducer;
