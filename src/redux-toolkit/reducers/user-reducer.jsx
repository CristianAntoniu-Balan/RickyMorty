import { createReducer } from '@reduxjs/toolkit';
import * as userActions from '../actions/user-actions';

const initialState = {
   isLoggedIn: false,
   loading: false,
   error: null,
   redirect: { to: '/', trigger: true },
};

const token_timeToExpireInMinutes = 10;

// TODO checkStatus
// TODO logIn

const userReducer = createReducer(initialState, (builder) => {
   builder
      .addCase(userActions.logIn.pending, (state = initialState, action) => {
         state.loading = true;
         state.error = null;
      })
      .addCase(userActions.logIn.fulfilled, (state = initialState, action) => {
         state.isLoggedIn = true;
         state.loading = false;
         state.error = null;
         sessionStorage.setItem(
            'logInData',
            JSON.stringify({
               token: action.payload,
               expiresAt: Date.now() + token_timeToExpireInMinutes * 60 * 1000,
            })
         );
         // state.redirect.trigger = false;
      })
      .addCase(userActions.logIn.rejected, (state = initialState, action) => {
         state.isLoggedIn = false;
         state.loading = false;
         state.error = action.payload;
      })
      .addCase(
         userActions.validateLogin.pending,
         (state = initialState, action) => {
            state.loading = true;
            state.error = null;
         }
      )
      .addCase(
         userActions.validateLogin.fulfilled,
         (state = initialState, action) => {
            state.isLoggedIn = true;
            state.loading = false;
         }
      )
      .addCase(
         userActions.validateLogin.rejected,
         (state = initialState, action) => {
            state.isLoggedIn = false;
            state.loading = false;
         }
      )
      .addCase(userActions.setRedirect, (state = initialState, action) => {
         state.redirect.to = action.payload;
         state.redirect.trigger = true;
      })
      .addCase(userActions.cancelRedirect, (state = initialState, action) => {
         state.redirect.trigger = false;
      })
      .addCase(userActions.logOut, (state = initialState, action) => {
         state.isLoggedIn = false;
         state.redirect.to = '/';
         state.redirect.trigger = true;
         sessionStorage.removeItem('logInData');
      })
      .addDefaultCase((state = initialState, action) => state);
});

export default userReducer;
