import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { logInAsync, isLoginValid } from '../../api/user';

// TODO register

export const logIn = createAsyncThunk(
   'logIn',
   async (data, { rejectWithValue }) => {
      try {
         return await logInAsync(data);
      } catch (err) {
         return rejectWithValue(err.message);
      }
   }
);

export const validateLogin = createAsyncThunk(
   'validateLogin',
   async (res, { rejectWithValue }) => {
      try {
         return (await isLoginValid()) || rejectWithValue();
      } catch (err) {
         return rejectWithValue(err.message);
      }
   }
);

export const resetValidation = createAction('resetValidation');

export const setRedirect = createAction('setRedirect');
export const cancelRedirect = createAction('cancelRedirect');

export const logOut = createAction('logOut');
