import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCharacters, getOneCharacterById } from '../../api/characters';

export const initFilterState = createAction('initFilterState');

export const getAll = createAsyncThunk(
   'getAll',
   async (res, { rejectWithValue }) => {
      try {
         res = await getAllCharacters();
         return res;
      } catch (err) {
         return rejectWithValue(err.message);
      }
   }
);

export const getOneById = createAsyncThunk(
   'getOneById',
   async (id, { rejectWithValue }) => {
      try {
         const res = await getOneCharacterById(id);
         return res;
      } catch (err) {
         return rejectWithValue(err.message);
      }
   }
);

export const sortCharacters = createAction('sortCharacters');

export const updateFilterQuery = createAction(
   'updateFilterQuery',
   function prepare(id, value) {
      return {
         payload: {
            id,
            value,
         },
      };
   }
);
