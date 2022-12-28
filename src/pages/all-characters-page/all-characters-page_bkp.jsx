import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import * as characterActions from '../../redux-toolkit/actions/character-actions';
import * as pageActions from '../../redux-toolkit/actions/page-actions';

import { localQueryBuilder, updatedStateObject } from '../../utils/utils';

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

      if (Object.keys(queryStateToBeUpdated).length) {
         dispatch(characterActions.updateQuery(queryStateToBeUpdated));
         // dispatch(pageActions.goToPageNumber(1));
      }

      if (Object.keys(pageStateToBeUpdated).length) {
         dispatch(
            pageActions.displayPerPage(pageStateToBeUpdated.itemsPerPage)
         );
         dispatch(pageActions.goToPageNumber(pageStateToBeUpdated.currentPage));
      }

      if (location.search === '') {
         console.log('empty', location);
      }
   }, [location.search]);

   useEffect(() => {
      navigate(
         location.pathname + localQueryBuilder(queryOptions, displayPage)
      );
   }, [location.search, queryOptions, displayPage]);

   useEffect(() => {
      const lastDisplayPage =
         queryInfo.count !== 0
            ? Math.ceil(queryInfo.count / displayPage.itemsPerPage)
            : 1;
      dispatch(pageActions.setLastPageNumber(lastDisplayPage));
   }, [queryInfo.count, displayPage.itemsPerPage]);

   useEffect(() => {
      dispatch(pageActions.goToPageNumber(1));
   }, [queryOptions]);

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

   // TODO multi-word filter ?

   // TODO current page resets after visiting single character page

   // const minIndex = (() => {
   //    if (displayPage.currentPage === 1 || displayPage.lastPage === 1) {
   //       return 0;
   //    } else {
   //       return (
   //          ((displayPage.currentPage - 1) * displayPage.itemsPerPage) %
   //          fetchPageItemsCount
   //       );
   //    }
   // })();

   // const maxIndex = minIndex + displayPage.itemsPerPage - 1;

   // const charactersTable = () => {
   //    let charactersDisplay = <Spinner />;
   //    if (characters.length) {
   //       charactersDisplay = characters
   //          .slice()
   //          .filter((el, index) => {
   //             if (index >= minIndex && index <= maxIndex) return el;
   //          })
   //          .sort((a, b) => {
   //             if (a[sorted.by] > b[sorted.by]) {
   //                return sorted.type;
   //             }
   //             return -1 * sorted.type;
   //          })
   //          .map((character) => (
   //             <CharacterRow
   //                key={character.id}
   //                charInfo={character}
   //             />
   //          ));
   //    }
   //    return (
   //       <React.Fragment>
   //          <PageNav />
   //          <HeaderRow />
   //          {charactersDisplay}
   //       </React.Fragment>
   //    );
   // };

   // return charactersTable();
   return (
      <React.Fragment>
         <PageNav />
         <CharactersTable />
      </React.Fragment>
   );
};

export default AllCharactersPage;
