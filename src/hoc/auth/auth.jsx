import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

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

   const origin = location?.pathname || '/';

   useEffect(() => {
      if (!isLoggedIn) {
         dispatch(userActions.setRedirect(origin));
         navigate('/login');
      }
   }, [isLoggedIn, origin]);

   return ret;
};

export default Auth;
