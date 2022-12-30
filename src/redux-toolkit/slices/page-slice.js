import { createSlice } from '@reduxjs/toolkit';

import { apiOptions } from '../../config/stringsURL';
import { pageButton } from '../../config/stringsGeneric';

const name = 'page';

let initialState = {};
(() => {
   Object.keys(apiOptions).forEach(
      (key) =>
         (initialState[key] = {
            itemsPerPage: 20,
            currentPage: 1,
            lastPage: 1,
         })
   );
})();

const reducers = {
   [pageButton.first.txt]: (state, action) => {
      state[action.payload.context].currentPage = 1;
   },
   [pageButton.prev.txt]: (state, action) => {
      state[action.payload.context].currentPage--;
   },
   [pageButton.next.txt]: (state, action) => {
      state[action.payload.context].currentPage++;
   },
   [pageButton.last.txt]: (state, action) => {
      state[action.payload.context].currentPage = Number(
         state[action.payload.context].lastPage
      );
   },
   goToPageNumber: (state, action) => {
      state[action.payload.context].currentPage = Number(action.payload.value);
   },
   displayPerPage: (state, action) => {
      state[action.payload.context].itemsPerPage = Number(action.payload.value);
   },
   setLastPageNumber: (state, action) => {
      state[action.payload.context].lastPage = Number(action.payload.value);
      if (
         state[action.payload.context].currentPage >
         Number(action.payload.value)
      ) {
         state[action.payload.context].currentPage = Number(
            action.payload.value
         );
      }
   },
   default: (state) => state,
};

const pageSlice = createSlice({ name, initialState, reducers });

export const {
   first = pageButton.first.txt,
   prev = pageButton.prev.txt,
   next = pageButton.next.txt,
   last = pageButton.last.txt,
   goToPageNumber,
   displayPerPage,
   setLastPageNumber,
} = pageSlice.actions;

export default pageSlice.reducer;
