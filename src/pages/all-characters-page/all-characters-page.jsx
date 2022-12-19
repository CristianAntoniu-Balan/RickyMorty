import React from 'react';
import { useSelector } from 'react-redux';

import Spinner from '../../components/spinner/spinner';
import CharacterRow from '../../components/character-table/character-row';
import HeaderRow from '../../components/character-table/header-row';

import Auth from '../../hoc/auth/auth';

const AllCharactersPage = () => {
   const characters = useSelector((state) => state.characters.allCharacters);
   const filtered = useSelector((state) => state.characters.filtered);
   const sorted = useSelector((state) => state.characters.sorted);

   // TODO pagination

   // TODO multi-word filter ?

   const charactersTable = () => {
      let charactersDisplay = <Spinner />;
      if (characters.length) {
         charactersDisplay = characters
            .slice()
            .filter((el) => {
               let isValid = true;
               for (const [key, value] of Object.entries(filtered)) {
                  if (value !== '') {
                     if (
                        !el[key]
                           .toString()
                           .match(new RegExp(value.toString(), 'gi'))
                     ) {
                        return false;
                     }
                  }
               }
               return isValid;
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
            {/* <Auth> */}
            <HeaderRow />
            {charactersDisplay}
            {/* </Auth> */}
         </React.Fragment>
      );
   };

   return charactersTable();
};

export default AllCharactersPage;
