import React, { useEffect } from 'react';
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
   useEffect(() => {
      dispatch(setContext(apiOptions.characters));
   }, []);

   // console.log(charactersQuery);
   const context = useSelector((state) => state.context);
   const characters = useSelector((state) => state.characters.queryCharacters);
   const queryOptions = useSelector((state) => state.query[context]);
   const queryInfo = useSelector((state) => state.characters.queryInfo);
   const sorted = useSelector((state) => state.sort[context]);
   const displayPage = useSelector((state) => state.page[context]);

   useEffect(() => {
      // console.log('here to page 1');
      if (context === apiOptions.characters) {
         dispatch(goToPageNumber({ context, value: 1 }));
      }
   }, [queryOptions]);

   useEffect(() => {
      context !== '' &&
         navigate(
            location.pathname + localQuery(displayPage, sorted, queryOptions)
         );
   }, [location.search, queryOptions, displayPage, context]);

   useEffect(() => {
      if (context === apiOptions.characters) {
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
   }, [displayPage, queryOptions, context]);

   useEffect(() => {
      if (context === apiOptions.characters) {
         const lastDisplayPage =
            queryInfo.count !== 0
               ? Math.ceil(queryInfo.count / displayPage.itemsPerPage)
               : 1;
         dispatch(setLastPageNumber({ context, value: lastDisplayPage }));
      }
   }, [queryInfo.count, displayPage?.itemsPerPage, context]);

   // useEffect(() => {
   //    if (displayPage.currentPage > displayPage.lastPage) {
   //       console.log('here to last page');
   //       dispatch(pageActions.goToPageNumber(displayPage.lastPage));
   //    }
   // }, [displayPage]);

   useEffect(() => {
      if (context === apiOptions.characters) {
         const queryStateToBeUpdated = updatedStateObject(
            queryOptions,
            location.search
         );
         const pageStateToBeUpdated = updatedStateObject(
            displayPage,
            location.search
         );

         if (Object.keys(pageStateToBeUpdated).length) {
            dispatch(
               displayPerPage({
                  context,
                  value: pageStateToBeUpdated.itemsPerPage,
               })
            );
            dispatch(
               goToPageNumber({
                  context,
                  value: pageStateToBeUpdated.currentPage,
               })
            );
         }

         if (Object.keys(queryStateToBeUpdated).length) {
            dispatch(characterActions.updateQuery(queryStateToBeUpdated));
            // dispatch(pageActions.goToPageNumber(1));
         }

         if (location.search === '') {
            // console.log('empty', location);
         }
      }
      // TODO parse query string and dispatch ...
      // console.log('updated');
   }, [location.search, context]);

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
