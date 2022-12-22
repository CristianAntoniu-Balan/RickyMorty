import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as pageActions from '../../redux-toolkit/actions/page-actions';

import { pageButton } from '../../config/stringsGeneric';

import Button from '../button/button';

import styles from './button-nav.module.css';

const PageNavButton = ({ type }) => {
   const dispatch = useDispatch();
   // const totalQueryPages = useSelector(
   //    (state) => state.characters.queryInfo.pages
   // );
   const page = useSelector((state) => state.page);

   const handleClick = (type) => {
      dispatch(pageActions[pageButton[type].txt]());
   };

   const isButtonDisabled =
      (page.currentPage === 1 &&
         (type === pageButton.first.txt || type === pageButton.prev.txt)) ||
      (page.currentPage === page.lastPage &&
         (type === pageButton.next.txt || type === pageButton.last.txt));

   const buttonText =
      (pageButton[type]?.symBefore || '') +
      pageButton[type].txt +
      (pageButton[type]?.symAfter || '');

   let pageNavButton = (
      // <button
      //    disabled={isDisabled}
      //    onClick={() => handleClick(type)}
      // >
      //    {pageButton[type]?.symBefore}
      //    {pageButton[type].txt}
      //    {pageButton[type]?.symAfter}
      // </button>
      <Button
         addClass={styles.buttonNav}
         text={buttonText}
         isDisabled={isButtonDisabled}
         clicked={() => handleClick(type)}
      />
   );
   return pageNavButton;
};

export default PageNavButton;
