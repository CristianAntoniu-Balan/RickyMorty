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

import { API_ITEMS_PER_PAGE } from '../../config/stringsURL';

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
   const [shouldNavigate = false, setShouldNavigate] = useState();
   const [loaded = false, setLoaded] = useState();
   const [shouldFetchCharacters = false, setShouldFetchCharacters] = useState();
   // console.log(charactersQuery);

   const context = useSelector((state) => state.context);
   const characters = useSelector((state) => state.characters.queryCharacters);
   const queryOptions = useSelector((state) => state.query[context]);
   const queryInfo = useSelector((state) => state.characters.queryInfo);
   const sorted = useSelector((state) => state.sort[context]);
   const displayPage = useSelector((state) => state.page[context]);

   const hasProperContext = context === apiOptions.characters;

   // console.log(
   //    'test',
   //    ...Object.keys(queryOptions).map((key) => `queryOptions.${key}`)
   // );

   useEffect(() => {
      console.log('setLoaded');
      setLoaded(true);
      // if (location.search === '') {
      //    console.log('setNav');
      //    setShouldNavigate(true);
      // } else {
      //    console.log('setURL');
      //    setShouldUpdateFromURL(true);
      // }
   }, []);

   useEffect(() => {
      if (!hasProperContext) {
         console.log('set context', location.search);
         dispatch(setContext(apiOptions.characters));
         if (location.search !== '') {
            console.log('setURL');
            setShouldUpdateFromURL(true);
         }
         // if (location.search === '') {
         //    console.log('setNav');
         //    setShouldNavigate(true);
         // } else {
         //    console.log('setURL');
         //    setShouldUpdateFromURL(true);
         // }
      } else if (shouldUpdateFromURL) {
         console.log('update from URL', location.search);

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

         if (Object.keys(sortStateToBeUpdated).length) {
            dispatch(updateSort(sortStateToBeUpdated));
         }
         if (Object.keys(queryStateToBeUpdated).length) {
            dispatch(characterActions.updateQuery(queryStateToBeUpdated));
            // dispatch(pageActions.goToPageNumber(1));
         }

         if (Object.keys(pageStateToBeUpdated).length) {
            dispatch(displayPerPage(pageStateToBeUpdated.itemsPerPage));
            dispatch(goToPageNumber(pageStateToBeUpdated.currentPage));
         }

         setShouldUpdateFromURL(false);
      }
   }, [hasProperContext, shouldUpdateFromURL]);

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
   //    if (hasProperContext && shouldNavigate) {
   //       console.log('navigate');
   //       // setShouldUpdateFromURL(false);
   //       setShouldNavigate(false);
   //       navigate(
   //          location.pathname + localQuery(displayPage, sorted, queryOptions)
   //       );
   //    }
   // }, [shouldNavigate]);

   useEffect(() => {
      if (hasProperContext && shouldFetchCharacters) {
         const fetchPageRange = () => {
            const firstFetchPage = Math.ceil(
               ((displayPage.currentPage - 1) * displayPage.itemsPerPage + 1) /
                  API_ITEMS_PER_PAGE
            );

            const lastFetchPage = Math.ceil(
               (displayPage.currentPage * displayPage.itemsPerPage) /
                  API_ITEMS_PER_PAGE
            );

            return { firstFetchPage, lastFetchPage };
         };

         console.log('fetch page range', fetchPageRange());
         console.log('getByQueryAndPageInterval');

         setShouldFetchCharacters(false);
         setShouldNavigate(true);
         dispatch(
            characterActions.getByQueryAndPageInterval({
               queryOptions,
               ...fetchPageRange(),
            })
         );
      }
   }, [shouldFetchCharacters]);

   useEffect(() => {
      setShouldFetchCharacters(true);
   }, [displayPage?.currentPage, displayPage?.itemsPerPage]);

   useEffect(() => {
      if (hasProperContext && !shouldUpdateFromURL) {
         setShouldFetchCharacters(true);
         if (loaded) {
            console.log('here to page 1');
            dispatch(goToPageNumber(1));
         }
      }
   }, [queryOptions]);

   useEffect(() => {
      const lastDisplayPage =
         hasProperContext && queryInfo.count !== 0
            ? Math.ceil(queryInfo.count / displayPage.itemsPerPage)
            : 1;
      console.log('last display page', lastDisplayPage);
      hasProperContext && dispatch(setLastPageNumber(lastDisplayPage));
   }, [queryInfo.count, displayPage?.itemsPerPage]);

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
