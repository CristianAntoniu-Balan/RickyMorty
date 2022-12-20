import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
   getAllCharacters,
   getOneCharacterById,
   getCharactersForQueryAndPageNo,
   getCharactersForQueryAndPageInterval,
} from '../../api/characters';

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

export const getByQueryAndPage = createAsyncThunk(
   'getByQueryAndPage',
   async (queryData, { rejectWithValue }) => {
      const { query, page } = queryData;
      try {
         const res = await getCharactersForQueryAndPageNo(query, page);
         return res;
      } catch (err) {
         return rejectWithValue(err.message);
      }
   }
);

export const getByQueryAndPageInterval = createAsyncThunk(
   'getByQueryAndPageInterval',
   async ({ query, firstFetchPage, lastFetchPage }, { rejectWithValue }) => {
      try {
         const res = await getCharactersForQueryAndPageInterval(
            query,
            firstFetchPage,
            lastFetchPage
         );
         return res;
      } catch (err) {
         return rejectWithValue(err.message);
      }
   }
);

export const sortCharacters = createAction('sortCharacters');

export const updateQuery = createAction(
   'updateQuery',
   function prepare(id, value) {
      return {
         payload: {
            id,
            value,
         },
      };
   }
);
