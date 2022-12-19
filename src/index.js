import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

// import * as characterActions from './redux-toolkit/actions/character-actions';
import charactersReducer from './redux-toolkit/reducers/characters-reducer';
import userReducer from './redux-toolkit/reducers/user-reducer';
import pageReducer from './redux-toolkit/reducers/page-reducer';
// import combinedStore from './redux-toolkit/index';

import styles from './index.module.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// TODO combine reducers
const store = configureStore({
   reducer: {
      characters: charactersReducer,
      user: userReducer,
      page: pageReducer,
   },
});

// store.dispatch(characterActions.getAll([]));

root.render(
   <React.StrictMode>
      <BrowserRouter>
         <Provider store={store}>
            <App />
         </Provider>
      </BrowserRouter>
   </React.StrictMode>
);
