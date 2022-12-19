import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './login-form.module.css';

import * as userActions from '../../redux-toolkit/actions/user-actions';
import * as strings from '../../config/stringsGeneric';
import * as error from '../../config/stringsError';

const LoginForm = (props) => {
   const dispatch = useDispatch();
   const isLogInError = useSelector((state) => state.user.error);

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(
         userActions.logIn({
            email: e.target.email.value,
            password: e.target.password.value,
         })
      );
   };

   return (
      <div className={styles.logIn}>
         <form
            className={styles.loginForm}
            onSubmit={(e) => handleSubmit(e)}
         >
            <div>{strings.logInCredentials}</div>
            <br />
            <label htmlFor="email">{strings.logInEmail}</label>
            <input
               type="email"
               id="email"
               name="email"
               required
            />
            <br />
            <label htmlFor="password">{strings.logInPassword}</label>
            <input
               type="password"
               id="password"
               name="password"
               required
            />
            <br />
            <button
               type="submit"
               id="submit"
               name="submit"
            >
               {strings.logInSubmitButton}
            </button>
         </form>
         <div>{isLogInError !== null && error.logInGenericError}</div>
      </div>
   );
};

export default LoginForm;
