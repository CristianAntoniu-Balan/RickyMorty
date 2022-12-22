import React from 'react';
import SpinnerImg from '../../../assets/nuclear-alert.gif';
import styles from './spinner.module.css';

const Spinner = () => {
   return (
      <div className={styles.spinner}>
         <img
            src={SpinnerImg}
            alt="Loading spinner"
         ></img>
      </div>
   );
};

export default Spinner;
