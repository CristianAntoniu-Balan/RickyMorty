import { createReducer } from '@reduxjs/toolkit';
import * as pageActions from '../actions/page-actions';

const initialState = {
   itemsPerPage: 20,
   currentPage: 1,
   lastPage: 1,
};

const pageReducer = createReducer(initialState, (builder) => {
   builder
      .addCase(pageActions.first, (state = initialState, action) => {
         state.currentPage = 1;
      })
      .addCase(pageActions.prev, (state = initialState, action) => {
         state.currentPage--;
      })
      .addCase(pageActions.next, (state = initialState, action) => {
         state.currentPage++;
      })
      .addCase(pageActions.last, (state = initialState, action) => {
         // TODO
         state.currentPage = state.lastPage;
      })
      .addCase(pageActions.goToPageNumber, (state = initialState, action) => {
         state.currentPage = action.payload;
      })
      .addCase(pageActions.displayPerPage, (state = initialState, action) => {
         state.itemsPerPage = action.payload;
      })
      .addDefaultCase((state = initialState, action) => state);
});

export default pageReducer;
