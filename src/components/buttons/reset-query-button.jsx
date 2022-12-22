import React from 'react';
import { useDispatch } from 'react-redux';

import * as characterActions from '../../redux-toolkit/actions/character-actions';

import { resetQuery } from '../../config/stringsGeneric';

import Button from '../button/button';

// import './button.module.css';

const ResetQueryButton = () => {
   const dispatch = useDispatch();

   const handleClick = () => {
      dispatch(characterActions.resetQuery());
   };

   return (
      <Button
         text={resetQuery.txt}
         clicked={handleClick}
      />
   );

   // return <button onClick={() => handleClick()}>{resetQuery.txt}</button>;
};

export default ResetQueryButton;
