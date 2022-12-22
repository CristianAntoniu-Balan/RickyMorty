import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as userActions from '../../redux-toolkit/actions/user-actions';

import Spinner from '../../components/00-simple-components/spinner/spinner';

const Auth = ({ children }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const location = useLocation();

   const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

   const origin = location?.pathname || '/';

   useEffect(() => {
      if (!isLoggedIn) {
         dispatch(userActions.setRedirect(origin));
         navigate('/login');
      } else {
         dispatch(userActions.validateLogin());
      }
   }, [isLoggedIn, origin]);

   return isLoggedIn ? children : <Spinner />;
};

export default Auth;
