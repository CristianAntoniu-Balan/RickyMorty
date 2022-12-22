import React from 'react';

import { classes } from '../../utils/utils';

import styles from './button.module.css';

const Button = ({ text, isDisabled, clicked, addClasses }) => {
   // TODO how to add classes from modules
   // console.log(classes(styles.genericButton, addClasses));

   return (
      <button
         className={classes(styles.genericButton, addClasses)}
         disabled={isDisabled}
         onClick={clicked}
      >
         {text}
      </button>
   );
};

export default Button;
