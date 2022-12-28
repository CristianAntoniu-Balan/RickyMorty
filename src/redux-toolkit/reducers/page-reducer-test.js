import { createReducer } from '@reduxjs/toolkit';
import * as pageActions from '../actions/page-actions-test';

// const initialState = {
//    itemsPerPage: 20,
//    currentPage: 1,
//    lastPage: 1,
// };

const pageReducerTest = (initialState, context) => {
   // console.log('context: ', context);
   console.log(pageActions.nextTest(context));

   return createReducer(initialState, (builder) => {
      builder
         // .addCase(
         //    pageActions.firstTest(context),
         //    (state = initialState, action) => {
         //       state.currentPage = 1;
         //    }
         // )
         // .addCase(
         //    pageActions.prevTest(context),
         //    (state = initialState, action) => {
         //       state.currentPage--;
         //    }
         // )
         .addCase(
            pageActions.nextTest(context),
            // { type: 'charactersTest_next', payload: undefined },
            (state = initialState, action) => {
               console.log('here ok');
               console.log(action.payload);
               state.currentPage++;
            }
         )
         // .addCase(
         //    pageActions.lastTest(context),
         //    (state = initialState, action) => {
         //       state.currentPage = Number(state.lastPage);
         //    }
         // )
         // .addCase(
         //    pageActions.goToPageNumberTest(context),
         //    (state = initialState, action) => {
         //       state.currentPage = Number(action.payload);
         //    }
         // )
         // .addCase(
         //    pageActions.displayPerPageTest(context),
         //    (state = initialState, action) => {
         //       state.itemsPerPage = Number(action.payload);
         //    }
         // )
         // .addCase(
         //    pageActions.setLastPageNumberTest(context),
         //    (state = initialState, action) => {
         //       state.lastPage = Number(action.payload);
         //       if (state.currentPage > Number(action.payload)) {
         //          state.currentPage = Number(action.payload);
         //       }
         //    }
         // )
         .addDefaultCase((state = initialState, action) => state);
   });
};

export default pageReducerTest;
