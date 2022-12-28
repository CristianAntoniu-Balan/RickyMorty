import { createSlice } from '@reduxjs/toolkit';

import charactersReducer from '../reducers/characters-reducer';
import pageReducerTest from '../reducers/page-reducer-test';

const createPageSliceTest = ({
   name,
   initialState,
   reducers,
   extraReducers,
}) => {
   initialState = {
      itemsPerPage: 20,
      currentPage: 1,
      lastPage: 5,
      ...initialState,
   };

   const pageReducer = pageReducerTest(initialState, name);
   console.log(pageReducer);
   return createSlice({
      name,
      initialState,
      reducers: {
         pageReducer,
         ...reducers,
      },
      extraReducers: {
         ...extraReducers,
      },
   });
};

export default createPageSliceTest;
