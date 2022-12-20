import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pageButton } from '../../config/stringsGeneric';
import PageNavButton from '../page-nav-button/page-nav-button';

import { itemsPerPage } from '../../config/stringsGeneric';
import * as pageActions from '../../redux-toolkit/actions/page-actions';

import './page-nav.module.css';

const PageNav = () => {
   const dispatch = useDispatch();

   const queryInfo = useSelector((state) => state.characters.queryInfo);
   const page = useSelector((state) => state.page);

   const navButtons = Object.keys(pageButton).map((buttonType) => (
      <PageNavButton
         key={buttonType}
         type={buttonType}
      />
   ));

   const pageSelector = [];

   for (let i = 1; i <= page.lastPage; i++) {
      pageSelector.push(
         <option
            key={i}
            value={i}
         >
            {i}
         </option>
      );
   }

   const itemsPerPageSelector = Object.entries(itemsPerPage)
      .sort((a, b) => a[0] - b[0])
      .filter((el) => {
         if (el[0] <= queryInfo.count || el[0] === 'all') {
            return el;
         }
         return null;
      })
      .filter((el) => {
         if (el !== null) return el;
      })
      .map(([key, items]) => (
         <option
            key={key}
            value={items === itemsPerPage.all ? queryInfo.count : items}
         >
            {items}
         </option>
      ));

   const handlePageChange = (toPageNumber) => {
      dispatch(pageActions.goToPageNumber(toPageNumber));
   };

   const handleItemsChange = (items) => {
      dispatch(pageActions.displayPerPage(items));
   };

   return (
      <div className="pageNav">
         <span>
            <span>Go to page: </span>
            {navButtons}
         </span>
         <span>
            <span>Display items per page: </span>
            <select
               name="displayItemsPerPage"
               value={page.itemsPerPage}
               onChange={(e) => handleItemsChange(e.target.value)}
            >
               {itemsPerPageSelector}
            </select>
         </span>
         <div>
            <span>Current page: </span>
            <select
               name="goToPageNumber"
               value={page.currentPage}
               onChange={(e) => handlePageChange(e.target.value)}
            >
               {/* {pageSelector.map((option) => option)} */}
               {pageSelector}
            </select>
            <span>
               out of {page.lastPage} page{page.lastPage > 1 && 's'}
            </span>
         </div>
      </div>
   );
};

export default PageNav;
