import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CharactersHeader from './characters-header';
import CharacterRow from './characters-row';
import Spinner from '../00-simple-components/spinner/spinner';

import { fetchPageItemsCount } from '../../config/stringsURL';

const CharactersTable = () => {
   const context = useSelector((state) => state.context);
   const characters = useSelector((state) => state.characters.queryCharacters);
   const displayPage = useSelector((state) => state.page[context]);
   const sorted = useSelector((state) => state.sort[context]);

   const minIndex = (() => {
      if (displayPage.currentPage === 1 || displayPage.lastPage === 1) {
         return 0;
      } else {
         return (
            ((displayPage.currentPage - 1) * displayPage.itemsPerPage) %
            fetchPageItemsCount
         );
      }
   })();

   const maxIndex = minIndex + displayPage.itemsPerPage - 1;

   const generateTableRows = () => {
      let tableRows = <Spinner />;
      if (characters.length) {
         tableRows = characters
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
      return tableRows;
   };
   return (
      <React.Fragment>
         <CharactersHeader />
         {generateTableRows()}
      </React.Fragment>
   );
};

export default CharactersTable;
