import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as userActions from '../../redux-toolkit/actions/user-actions';

import LoginForm from '../../components/login-form/login-form';

const LoginPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const redirect = useSelector((state) => state.user.redirect);
   const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

   useEffect(() => {
      if (isLoggedIn) {
         if (redirect.trigger) {
            navigate(redirect.to);
         } else {
            dispatch(userActions.logOut());
         }
      }

      return () => {
         if (isLoggedIn && redirect.trigger) {
            return dispatch(userActions.cancelRedirect());
         }
      };
   }, [isLoggedIn, redirect]);

   return (
      <React.Fragment>
         <LoginForm />
      </React.Fragment>
   );
};

export default LoginPage;
