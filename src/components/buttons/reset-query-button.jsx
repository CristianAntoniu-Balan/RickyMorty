import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as characterActions from '../../redux-toolkit/actions/character-actions';
import { resetQuery } from '../../redux-toolkit/slices/query-slice';

import { resetQueryTxt } from '../../config/stringsGeneric';

import styles from './buttons.module.css';

const ResetQueryButton = () => {
   const dispatch = useDispatch();
   const context = useSelector((state) => state.context);

   const handleClick = () => {
      dispatch(resetQuery());
   };

   return (
      <button
         className={styles.button}
         onClick={handleClick}
      >
         {resetQueryTxt.txt}
      </button>
   );
};

export default ResetQueryButton;
