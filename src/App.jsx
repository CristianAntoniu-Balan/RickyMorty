import { useSelector, useDispatch } from 'react-redux';
import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Link, useParams, useLocation } from 'react-router-dom';

import styles from './App.module.css';
import * as characterActions from './redux-toolkit/actions/character-actions';
import * as userActions from './redux-toolkit/actions/user-actions';
import * as pageActions from './redux-toolkit/actions/page-actions';

import * as path from './config/stringsPath';

import Spinner from './components/00-simple-components/spinner/spinner';
import Auth from './hoc/auth/auth';

const LoginPage = React.lazy(() => import('./pages/login-page/login-page'));
const AllCharactersPage = React.lazy(() =>
   import('./pages/all-characters-page/all-characters-page')
);
const SingleCharacterPage = React.lazy(() =>
   import('./pages/single-character-page/single.character-page')
);

function App() {
   const dispatch = useDispatch();
   const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

   const singleCharId = useSelector(
      (state) => state.characters.selectedCharacterData.id
   );

   const testElement = (
      <React.Fragment>
         <div onClick={() => dispatch(characterActions.getAll())}>
            Get all characters
         </div>
         <div
         // onClick={() =>
         //    singleCharId
         //       ? dispatch(characterActions.getOneById(singleCharId || 0))
         //       : null
         // }
         >
            Get ONE character
         </div>
         <div onClick={() => dispatch(userActions.logOut())}>log test</div>
      </React.Fragment>
   );

   return (
      <React.Fragment>
         <nav className={styles.navBar}>
            <Link to={path.to.home}>Home</Link>
            <Link to={path.to.characters}>Characters</Link>
            <Link to={path.to.singleCharacter + `${singleCharId || '0'}`}>
               SingleCharTest
            </Link>
            <Link to={path.to.login}>{isLoggedIn ? 'Log Out' : 'Log In'}</Link>
         </nav>
         <div>
            <Suspense fallback={<Spinner />}>
               <Routes>
                  <Route
                     path={path.to.home}
                     element={testElement}
                  />
                  <Route path={path.to.characters}>
                     <Route
                        path=""
                        element={
                           // <Auth>
                           <AllCharactersPage />
                           // </Auth>
                        }
                     />
                     {/* <Route
                        path=":charactersQuery"
                        element={
                           // <Auth>
                           <AllCharactersPage />
                           // </Auth>
                        }
                     /> */}
                  </Route>
                  <Route
                     path={path.to.singleCharacter + `:id`}
                     element={
                        // <Auth>
                        <SingleCharacterPage />
                        // </Auth>
                     }
                  ></Route>
                  <Route
                     path={path.to.login}
                     element={<LoginPage />}
                  />
               </Routes>
            </Suspense>
         </div>
      </React.Fragment>
   );
}

export default App;
