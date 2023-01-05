import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import * as characterActions from '../../redux-toolkit/actions/character-actions';
// import * as pageActions from '../../redux-toolkit/actions/page-actions';
import {
   goToPageNumber,
   setLastPageNumber,
   displayPerPage,
} from '../../redux-toolkit/slices/page-slice';
import { setContext } from '../../redux-toolkit/slices/context-slice';
import { updateSort } from '../../redux-toolkit/slices/sort-slice';

import { apiOptions } from '../../config/stringsURL';

import { localQuery, updatedStateObject } from '../../utils/utils';

import { fetchPageItemsCount } from '../../config/stringsURL';

import Spinner from '../../components/00-simple-components/spinner/spinner';
import CharacterRow from '../../components/characters-table/characters-row';
import HeaderRow from '../../components/characters-table/characters-header';
import PageNav from '../../components/page-nav/page-nav';
import CharactersTable from '../../components/characters-table/characters-table';

const AllCharactersPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();
   // const charactersQuery = useParams();

   const [shouldUpdateFromURL = false, setShouldUpdateFromURL] = useState();
   // console.log(charactersQuery);

   const context = useSelector((state) => state.context);
   const characters = useSelector((state) => state.characters.queryCharacters);
   const queryOptions = useSelector((state) => state.query[context]);
   const queryInfo = useSelector((state) => state.characters.queryInfo);
   const sorted = useSelector((state) => state.sort[context]);
   const displayPage = useSelector((state) => state.page[context]);

   const hasProperContext = context === apiOptions.characters;

   useEffect(() => {
      if (!hasProperContext) {
         console.log('set yes', location.search);
         setShouldUpdateFromURL(true);
         dispatch(setContext(apiOptions.characters));
      } else if (shouldUpdateFromURL) {
         console.log('triggered update', location.search);
         const queryStateToBeUpdated = updatedStateObject(
            queryOptions,
            location.search
         );
         const pageStateToBeUpdated = updatedStateObject(
            displayPage,
            location.search
         );
         const sortStateToBeUpdated = updatedStateObject(
            sorted,
            location.search
         );

         console.log(
            'state to be updated',
            queryStateToBeUpdated,
            pageStateToBeUpdated,
            sortStateToBeUpdated
         );

         if (Object.keys(pageStateToBeUpdated).length) {
            dispatch(displayPerPage(pageStateToBeUpdated.itemsPerPage));
            dispatch(goToPageNumber(pageStateToBeUpdated.currentPage));
         }

         if (Object.keys(queryStateToBeUpdated).length) {
            dispatch(characterActions.updateQuery(queryStateToBeUpdated));
            // dispatch(pageActions.goToPageNumber(1));
         }

         if (Object.keys(sortStateToBeUpdated).length) {
            dispatch(updateSort(sortStateToBeUpdated));
         }

         setShouldUpdateFromURL(false);
      }
   }, [hasProperContext, shouldUpdateFromURL]);

   useEffect(() => {
      if (hasProperContext && !shouldUpdateFromURL) {
         console.log(
            'here to page 1',
            displayPage.currentPage,
            location.search
         );
         dispatch(goToPageNumber(1));
      }
   }, [queryOptions]);

   useEffect(() => {
      if (hasProperContext && !shouldUpdateFromURL) {
         console.log('fetch page range');
         const fetchPageRange = () => {
            const firstFetchPage = Math.ceil(
               ((displayPage.currentPage - 1) * displayPage.itemsPerPage + 1) /
                  fetchPageItemsCount
            );

            const lastFetchPage = Math.ceil(
               (displayPage.currentPage * displayPage.itemsPerPage) /
                  fetchPageItemsCount
            );

            return { firstFetchPage, lastFetchPage };
         };

         console.log('getByQueryAndPageInterval');
         dispatch(
            characterActions.getByQueryAndPageInterval({
               queryOptions,
               ...fetchPageRange(),
            })
         );

         // navigate(
         //    location.pathname + localQueryBuilder(queryOptions, displayPage)
         // );
      }
   }, [
      displayPage?.currentPage,
      displayPage?.itemsPerPage,
      queryOptions,
      hasProperContext,
      shouldUpdateFromURL,
   ]);

   useEffect(() => {
      if (hasProperContext && !shouldUpdateFromURL) {
         const lastDisplayPage =
            queryInfo.count !== 0
               ? Math.ceil(queryInfo.count / displayPage.itemsPerPage)
               : 1;
         console.log('last display page');
         dispatch(setLastPageNumber(lastDisplayPage));
      }
   }, [
      queryInfo.count,
      displayPage?.itemsPerPage,
      hasProperContext,
      shouldUpdateFromURL,
   ]);

   useEffect(() => {
      // context !== '' &&
      // !shouldUpdateFromURL &&
      if (
         hasProperContext &&
         (!shouldUpdateFromURL || location.search === '')
      ) {
         console.log('navigate');
         navigate(
            location.pathname + localQuery(displayPage, sorted, queryOptions)
         );
      }
   }, [
      hasProperContext,
      location.search,
      queryOptions,
      displayPage,
      context,
      sorted,
      shouldUpdateFromURL,
   ]);

   // useEffect(() => {
   //    if (displayPage.currentPage > displayPage.lastPage) {
   //       console.log('here to last page');
   //       dispatch(pageActions.goToPageNumber(displayPage.lastPage));
   //    }
   // }, [displayPage]);

   useEffect(() => {
      if (hasProperContext) {
      }
      // TODO parse query string and dispatch ...
      // console.log('updated');
   }, [location.search, hasProperContext]);

   // TODO multi-word filter ?

   // TODO current page resets after visiting single character page

   return context !== apiOptions.characters ? (
      <Spinner />
   ) : (
      <React.Fragment>
         <PageNav />
         <CharactersTable />
      </React.Fragment>
   );
};

export default AllCharactersPage;
