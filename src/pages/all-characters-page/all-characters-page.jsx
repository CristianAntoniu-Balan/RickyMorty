import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as characterActions from '../../redux-toolkit/actions/character-actions';
import * as pageActions from '../../redux-toolkit/actions/page-actions';

import { fetchPageItemsCount } from '../../config/stringsURL';

import Spinner from '../../components/spinner/spinner';
import CharacterRow from '../../components/character-table/character-row';
import HeaderRow from '../../components/character-table/header-row';
import PageNav from '../../components/page-nav/page-nav';

const AllCharactersPage = () => {
   const dispatch = useDispatch();

   const characters = useSelector((state) => state.characters.queryCharacters);
   const query = useSelector((state) => state.characters.query);
   const queryInfo = useSelector((state) => state.characters.queryInfo);
   const sorted = useSelector((state) => state.characters.sorted);
   const displayPage = useSelector((state) => state.page);

   // useEffect(() => {
   //    dispatch(characterActions.getByQueryAndPage({ query, page: 1 }));
   // }, [query]);

   // TODO pagination

   useEffect(() => {
      const lastDisplayPage =
         queryInfo.count !== 0
            ? Math.ceil(queryInfo.count / displayPage.itemsPerPage)
            : 1;
      console.log(
         Number(queryInfo.count),
         displayPage.itemsPerPage,
         Math.ceil(queryInfo.count / displayPage.itemsPerPage)
      );
      dispatch(pageActions.setLastPageNumber(lastDisplayPage));
   }, [queryInfo.count, displayPage.itemsPerPage]);

   useEffect(() => {
      dispatch(pageActions.goToPageNumber(1));
   }, [query]);

   useEffect(() => {
      // pagination logic
      // visible range
      const fetchPageRange = () => {
         // TODO items per page 100, breaks query, check element & page indexes calc
         const lastElementIndex = Math.min(
            displayPage.currentPage * displayPage.itemsPerPage,
            Math.max(queryInfo.count, 1)
         );
         const firstElementIndex =
            Math.max(lastElementIndex - displayPage.itemsPerPage, 1) + 1;
         const firstFetchPage = Math.ceil(
            firstElementIndex / fetchPageItemsCount
         );
         const lastFetchPage = Math.ceil(
            lastElementIndex / fetchPageItemsCount
         );

         console.log('fetchPages: ', firstFetchPage, lastFetchPage);

         return { firstFetchPage, lastFetchPage };
      };

      dispatch(
         characterActions.getByQueryAndPageInterval({
            query,
            ...fetchPageRange(),
         })
      );
   }, [
      displayPage.currentPage,
      displayPage.itemsPerPage,
      queryInfo.count,
      query,
   ]);

   // TODO multi-word filter ?

   // filtering index logic
   const minIndex = (() => {
      if (displayPage.currentPage === 1 || displayPage.lastPage === 1) {
         return 0;
      } else {
         // TODO calcul caca ... make OK ... must check
         return (
            ((displayPage.currentPage - 1) * displayPage.itemsPerPage) %
            fetchPageItemsCount
         );
      }
   })();

   const maxIndex = minIndex + displayPage.itemsPerPage;

   console.log(minIndex, maxIndex);

   const charactersTable = () => {
      let charactersDisplay = <Spinner />;
      if (characters.length) {
         charactersDisplay = characters
            .slice()
            .filter((el, index) => {
               if (index >= minIndex && index <= maxIndex) return el;
            })
            .sort((a, b) => {
               if (a[sorted.by] > b[sorted.by]) {
                  return sorted.type;
               }
               return -1 * sorted.type;
            })
            .map((character) => (
               <CharacterRow
                  key={character.id}
                  charInfo={character}
               />
            ));
      }
      return (
         <React.Fragment>
            <PageNav />
            <HeaderRow />
            {charactersDisplay}
         </React.Fragment>
      );
   };

   return charactersTable();
};

export default AllCharactersPage;
