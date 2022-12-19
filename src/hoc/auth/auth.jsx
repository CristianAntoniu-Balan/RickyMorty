import React, { useEffect, useRef } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// import { isLoginValid } from '../../api/user';

import * as userActions from '../../redux-toolkit/actions/user-actions';

import Spinner from '../../components/spinner/spinner';

const Auth = ({ children }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const location = useLocation();

   const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

   let ret = <Spinner />;

   if (isLoggedIn) {
      dispatch(userActions.validateLogin());
      ret = children;
   }

   // const redirectTo = (where) => {
   //    return (
   //       <Navigate
   //          to={where}
   //          replace
   //          state={{ from: location }}
   //       />
   //    );
   // };

   const origin = location?.pathname || '/';

   // isLoginValid().then((valid) => {
   //    if (!(valid && isLoggedIn)) {
   //       // dispatch(userActions.setRedirect(origin));
   //       // navigate('/login');
   //    }
   // });

   useEffect(() => {
      if (!isLoggedIn) {
         dispatch(userActions.setRedirect(origin));
         navigate('/login');
      }
   }, [isLoggedIn]);

   // useEffect(() => {
   //    if (isLoggedIn) {
   //       dispatch(userActions.validateLogin());
   //       // ret.current = children;
   //    } else {
   //       navigate('/login');
   //    }

   // return () => dispatch(userActions.resetValidation());
   // }, [isLoggedIn]);

   return ret;
};

export default Auth;
