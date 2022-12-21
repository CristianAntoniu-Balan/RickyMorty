import { createReducer } from '@reduxjs/toolkit';
import * as characterActions from '../actions/character-actions';
import { table } from '../../config/stringsTable';
import { initQueryInfo } from '../../config/stringsURL';

function initQuery() {
   const initQuery = {};
   table.forEach((el) => {
      el.canFilter && Object.assign(initQuery, { [el.id]: el.filterQuery });
   });
   return initQuery;
}

const initialState = {
   queryCharacters: [],
   selectedCharacterData: {},
   loading: false,
   error: null,
   sorted: {
      by: 'id',
      type: 1,
   },
   queryInfo: { ...initQueryInfo },
   query: { ...initQuery() },
};

const charactersReducer = createReducer(initialState, (builder) => {
   builder
      .addCase(characterActions.updateQuery, (state = initialState, action) => {
         state.query[action.payload.id] = action.payload.value;
      })
      .addCase(characterActions.resetQuery, (state = initialState, action) => {
         state.query = { ...initQuery() };
      })
      .addCase(
         characterActions.getAll.pending,
         (state = initialState, action) => {
            state.loading = true;
            state.error = null;
         }
      )
      .addCase(
         characterActions.getAll.fulfilled,
         (state = initialState, action) => {
            state.queryCharacters = [...action.payload];
            state.loading = false;
            state.error = null;
         }
      )
      .addCase(
         characterActions.getAll.rejected,
         (state = initialState, action) => {
            state.loading = false;
            state.error = action.payload;
         }
      )
      .addCase(
         characterActions.getByQueryAndPageInterval.pending,
         (state = initialState, action) => {
            state.loading = true;
            state.error = null;
         }
      )
      .addCase(
         characterActions.getByQueryAndPageInterval.fulfilled,
         (state = initialState, action) => {
            state.queryInfo = { ...action.payload.queryInfo };
            state.queryCharacters = [...action.payload.chars];
            state.loading = false;
            state.error = null;
         }
      )
      .addCase(
         characterActions.getByQueryAndPageInterval.rejected,
         (state = initialState, action) => {
            state.queryCharacters = [];
            state.loading = false;
            state.error = action.payload;
            state.queryInfo = { ...initQueryInfo };
         }
      )
      .addCase(
         characterActions.getOneById.pending,
         (state = initialState, action) => {
            state.loading = true;
            state.error = null;
         }
      )
      .addCase(
         characterActions.getOneById.fulfilled,
         (state = initialState, action) => {
            state.selectedCharacterData = { ...action.payload };
            state.loading = false;
            state.error = null;
         }
      )
      .addCase(
         characterActions.getOneById.rejected,
         (state = initialState, action) => {
            state.loading = false;
            state.error = action.payload;
         }
      )
      .addCase(
         characterActions.getByQueryAndPage.pending,
         (state = initialState, action) => {
            state.loading = true;
            state.error = null;
         }
      )
      .addCase(
         characterActions.getByQueryAndPage.fulfilled,
         (state = initialState, action) => {
            state.queryInfo = { ...action.payload.queryInfo };
            state.queryCharacters = [...action.payload.chars];
            state.loading = false;
            state.error = null;
         }
      )
      .addCase(
         characterActions.getByQueryAndPage.rejected,
         (state = initialState, action) => {
            state.queryCharacters = [];
            state.queryInfo = { ...initQueryInfo };
            state.loading = false;
            state.error = action.payload;
         }
      )
      .addCase(
         characterActions.sortCharacters,
         (state = initialState, action) => {
            if (state.sorted.by === action.payload) {
               state.sorted.type = -1 * state.sorted.type;
            } else {
               state.sorted.by = action.payload;
               state.sorted.type = 1;
            }
         }
      )
      .addDefaultCase((state = initialState, action) => state);
});

export default charactersReducer;
