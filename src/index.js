import React from 'react';
import ReactDOM from 'react-dom/client';
import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import charactersReducer from './redux-toolkit/reducers/characters-reducer';
import userReducer from './redux-toolkit/reducers/user-reducer';
import pageReducer from './redux-toolkit/slices/page-slice';
import sortReducer from './redux-toolkit/slices/sort-slice';
import queryReducer from './redux-toolkit/slices/query-slice';
import contextReducer from './redux-toolkit/slices/context-slice';

import styles from './index.module.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
   reducer: {
      characters: charactersReducer,
      query: queryReducer,
      sort: sortReducer,
      page: pageReducer,
      user: userReducer,
      context: contextReducer,
   },
});

// TODO catch errors and display message

root.render(
   <React.StrictMode>
      <BrowserRouter>
         <Provider store={store}>
            <App />
         </Provider>
      </BrowserRouter>
   </React.StrictMode>
);
