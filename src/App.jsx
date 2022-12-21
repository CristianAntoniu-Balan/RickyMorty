import { useSelector, useDispatch } from 'react-redux';
import React, { Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import styles from './App.module.css';
import * as characterActions from './redux-toolkit/actions/character-actions';
import * as userActions from './redux-toolkit/actions/user-actions';
import * as pageActions from './redux-toolkit/actions/page-actions';
import Spinner from './components/spinner/spinner';

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
   // const initFilter = useSelector((state) => state.characters.filtered);
   // Object.keys(initFilter).length === 0 &&
   //    dispatch(characterActions.initFilterState());
   // TODO for testing only
   const id = 5;
   // TODO

   const testElement = (
      <React.Fragment>
         <div onClick={() => dispatch(characterActions.getAll())}>
            Get all characters
         </div>
         <div onClick={() => dispatch(characterActions.getOneById(id))}>
            Get ONE character
         </div>
         <div onClick={() => dispatch(userActions.logOut())}>log test</div>
      </React.Fragment>
   );

   return (
      <React.Fragment>
         <nav className={styles.navBar}>
            <Link to="/">Home</Link>
            <Link to="/characters">Characters</Link>
            <Link to="/singlechartest">SingleCharTest</Link>
            <Link to="/login">{isLoggedIn ? 'Log Out' : 'Log In'}</Link>
         </nav>
         <div>
            <Suspense fallback={<Spinner />}>
               <Routes>
                  <Route
                     path="/"
                     element={testElement}
                  />
                  <Route
                     path="/characters"
                     element={
                        <Auth>
                           <AllCharactersPage />
                        </Auth>
                     }
                  />
                  <Route
                     path="/singlechartest"
                     element={
                        <Auth>
                           <SingleCharacterPage />
                        </Auth>
                     }
                  ></Route>
                  <Route
                     path="/login"
                     element={<LoginPage />}
                  />
               </Routes>
            </Suspense>
         </div>
      </React.Fragment>
   );
}

// const ConnectedApp = connect(mapState, actionCreators)(App);

export default App;
