import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import charactersReducer from './redux-toolkit/reducers/characters-reducer';
import userReducer from './redux-toolkit/reducers/user-reducer';
import pageReducer from './redux-toolkit/reducers/page-reducer';

import styles from './index.module.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
   reducer: {
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
