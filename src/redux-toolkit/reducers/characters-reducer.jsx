import { createReducer } from '@reduxjs/toolkit';
import * as characterActions from '../actions/character-actions';
import { table } from '../../config/stringsTable';

const initialState = {
   allCharacters: [],
   selectedCharacterData: {},
   loading: false,
   error: null,
   sorted: {
      by: 'id',
      type: 1,
   },
   filtered: {},
   // {by: query}
};

const initFiltered = () => {
   table.forEach((el) => {
      el.canFilter &&
         Object.assign(initialState.filtered, { [el.id]: el.filterQuery });
   });
};

initFiltered();

const charactersReducer = createReducer(initialState, (builder) => {
   builder
      .addCase(
         characterActions.updateFilterQuery,
         (state = initialState, action) => {
            state.filtered[action.payload.id] = action.payload.value;
         }
      )
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
            state.allCharacters = [...action.payload];
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
