import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as characterActions from '../../redux-toolkit/actions/character-actions';

import Spinner from '../../components/spinner/spinner';
import CharacterRow from '../../components/character-table/character-row';
import HeaderRow from '../../components/character-table/header-row';
import PageNav from '../../components/page-nav/page-nav';

const AllCharactersPage = () => {
   const dispatch = useDispatch();

   const characters = useSelector((state) => state.characters.queryCharacters);
   const query = useSelector((state) => state.characters.query);
   const sorted = useSelector((state) => state.characters.sorted);
   const displayPage = useSelector((state) => state.page);

   useEffect(() => {
      dispatch(characterActions.getByQueryAndPage({ query, page: 1 }));
   }, [query]);

   // TODO pagination

   // TODO multi-word filter ?

   const charactersTable = () => {
      let charactersDisplay = <Spinner />;
      if (characters.length) {
         charactersDisplay = characters
            .slice()
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
