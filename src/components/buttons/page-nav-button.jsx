import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as pageActions from '../../redux-toolkit/actions/page-actions';

import { pageButton } from '../../config/stringsGeneric';

import styles from './buttons.module.css';

const PageNavButton = ({ type }) => {
   const dispatch = useDispatch();
   const page = useSelector((state) => state.page);

   const handleClick = (type) => {
      dispatch(pageActions[pageButton[type].txt]());
   };

   const isDisabled =
      (page.currentPage === 1 &&
         (type === pageButton.first.txt || type === pageButton.prev.txt)) ||
      (page.currentPage === page.lastPage &&
         (type === pageButton.next.txt || type === pageButton.last.txt));

   const buttonText =
      (pageButton[type]?.symBefore || '') +
      pageButton[type].txt +
      (pageButton[type]?.symAfter || '');

   return (
      <button
         className={styles.button}
         disabled={isDisabled}
         onClick={() => handleClick(type)}
      >
         {buttonText}
      </button>
   );
};

export default PageNavButton;
