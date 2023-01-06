import { createSlice } from '@reduxjs/toolkit';

import { apiOptions } from '../../config/stringsURL';

const name = 'context';

const initialState = '';

const reducers = {
   setContext: (state, action) =>
      action.payload in apiOptions ? (state = action.payload) : state,
   default: (state) => state,
};

const sortSlice = createSlice({ name, initialState, reducers });

export const { setContext } = sortSlice.actions;

export default sortSlice.reducer;
