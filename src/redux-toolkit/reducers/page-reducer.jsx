import { createReducer } from '@reduxjs/toolkit';
import * as pageActions from '../actions/page-actions';

const initialState = {
   itemsPerPage: 20,
   currentPage: 1,
};

const pageReducer = createReducer(initialState, (builder) => {
   builder
      .addCase(pageActions.forward, (state = initialState, action) => {
         state.currentPage++;
      })
      .addCase(pageActions.back, (state = initialState, action) => {
         state.currentPage--;
      })
      .addCase(pageActions.toNumber, (state = initialState, action) => {
         state.currentPage = action.payload;
      })
      .addDefaultCase((state = initialState, action) => state);
});

export default pageReducer;
