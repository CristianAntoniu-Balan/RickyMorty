import React from 'react';
import { useDispatch } from 'react-redux';

import * as characterActions from '../../redux-toolkit/actions/character-actions';

import { resetQuery } from '../../config/stringsGeneric';

import styles from './buttons.module.css';

const ResetQueryButton = () => {
   const dispatch = useDispatch();

   const handleClick = () => {
      dispatch(characterActions.resetQuery());
   };

   return (
      <button
         className={styles.button}
         onClick={handleClick}
      >
         {resetQuery.txt}
      </button>
   );
};

export default ResetQueryButton;
