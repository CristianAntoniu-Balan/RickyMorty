import React from 'react';
import { useDispatch } from 'react-redux';

import * as characterActions from '../../redux-toolkit/actions/character-actions';

import { resetQuery } from '../../config/stringsGeneric';

import './button.module.css';

const ResetQueryButton = ({ type }) => {
   const dispatch = useDispatch();

   const handleClick = (type) => {
      dispatch(characterActions.resetQuery());
   };

   return <button onClick={() => handleClick(type)}>{resetQuery.txt}</button>;
};

export default ResetQueryButton;
