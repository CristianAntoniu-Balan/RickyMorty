import React from 'react';
import ReactDOM from 'react-dom/client';
import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import charactersReducer from './redux-toolkit/reducers/characters-reducer';
import userReducer from './redux-toolkit/reducers/user-reducer';
import pageReducer from './redux-toolkit/reducers/page-reducer';
import createPageSliceTest from './redux-toolkit/slices/page-slice-test';

import styles from './index.module.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// const test = combineReducers({
//    charTest: charactersReducer,
//    page: pageReducer,
// });

// const testSlice = { name: 'testSlice', reducers: pageReducer };
// const testSlice2 = { name: 'testSlice2', reducers: pageReducer };
const charactersPageTest = createPageSliceTest({ name: 'charactersTest' });
const combinedCharactersAndPage = {
   name: 'charactersTest',
   reducers: combineReducers({
      char: charactersReducer,
      pageTest: charactersPageTest.reducer,
   }),
};

// console.log('slice: ', testSlice);

const store = configureStore({
   reducer: {
      [combinedCharactersAndPage.name]: combinedCharactersAndPage.reducers,
      // test: testSlice.reducers,
      // test2: testSlice2.reducers,
      characters: charactersReducer,
      user: userReducer,
      page: pageReducer,
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
