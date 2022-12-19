import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as characterActions from '../../redux-toolkit/actions/character-actions';

import Spinner from '../../components/spinner/spinner';
import CharacterRow from '../../components/character-table/character-row';
import HeaderRow from '../../components/character-table/header-row';

const AllCharactersPage = () => {
   const dispatch = useDispatch();

   const characters = useSelector((state) => state.characters.queryCharacters);
   const query = useSelector((state) => state.characters.query);
   const sorted = useSelector((state) => state.characters.sorted);

   useEffect(() => {
      dispatch(characterActions.getByQueryAndPage({ query, page: 1 }));
   }, [query]);

   console.log('characters:', characters);

   // TODO pagination

   // TODO multi-word filter ?

   const charactersTable = () => {
      let charactersDisplay = <Spinner />;
      if (characters.length) {
         charactersDisplay = characters
            .slice()
            // .filter((el) => {
            //    let isValid = true;
            //    for (const [key, value] of Object.entries(query)) {
            //       if (value !== '') {
            //          if (
            //             !el[key]
            //                .toString()
            //                .match(new RegExp(value.toString(), 'gi'))
            //          ) {
            //             return false;
            //          }
            //       }
            //    }
            //    return isValid;
            // })
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
            <HeaderRow />
            {charactersDisplay}
         </React.Fragment>
      );
   };

   return charactersTable();
};

export default AllCharactersPage;
