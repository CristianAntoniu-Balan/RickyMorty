import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import * as characterActions from '../../redux-toolkit/actions/character-actions';
import * as pageActions from '../../redux-toolkit/actions/page-actions';

import { localCharactersQuery, updatedStateObject } from '../../utils/utils';

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

   // console.log(charactersQuery);

   const characters = useSelector((state) => state.characters.queryCharacters);
   const queryOptions = useSelector((state) => state.characters.query);
   const queryInfo = useSelector((state) => state.characters.queryInfo);
   const sorted = useSelector((state) => state.characters.sorted);
   const displayPage = useSelector((state) => state.page);

   useEffect(() => {
      console.log('here to page 1');
      dispatch(pageActions.goToPageNumber(1));
   }, [queryOptions]);

   useEffect(() => {
      navigate(
         location.pathname + localCharactersQuery(queryOptions, displayPage)
      );
   }, [location.search, queryOptions, displayPage]);

   useEffect(() => {
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
   }, [displayPage, queryOptions]);

   useEffect(() => {
      const lastDisplayPage =
         queryInfo.count !== 0
            ? Math.ceil(queryInfo.count / displayPage.itemsPerPage)
            : 1;
      dispatch(pageActions.setLastPageNumber(lastDisplayPage));
   }, [queryInfo.count, displayPage.itemsPerPage]);

   // useEffect(() => {
   //    if (displayPage.currentPage > displayPage.lastPage) {
   //       console.log('here to last page');
   //       dispatch(pageActions.goToPageNumber(displayPage.lastPage));
   //    }
   // }, [displayPage]);

   useEffect(() => {
      // TODO parse query string and dispatch ...
      console.log('updated');

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
            pageActions.displayPerPage(pageStateToBeUpdated.itemsPerPage)
         );
         dispatch(pageActions.goToPageNumber(pageStateToBeUpdated.currentPage));
      }

      if (Object.keys(queryStateToBeUpdated).length) {
         dispatch(characterActions.updateQuery(queryStateToBeUpdated));
         // dispatch(pageActions.goToPageNumber(1));
      }

      if (location.search === '') {
         console.log('empty', location);
      }
   }, [location.search]);

   // TODO multi-word filter ?

   // TODO current page resets after visiting single character page

   return (
      <React.Fragment>
         <PageNav />
         <CharactersTable />
      </React.Fragment>
   );
};

export default AllCharactersPage;
