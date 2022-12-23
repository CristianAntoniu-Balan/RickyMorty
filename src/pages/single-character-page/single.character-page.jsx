import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

import Spinner from '../../components/00-simple-components/spinner/spinner';
import CharacterBio from '../../components/character-bio/character-bio';

import * as characterActions from '../../redux-toolkit/actions/character-actions';

const SingleCharacterPage = () => {
   const dispatch = useDispatch();
   const { id } = useParams();

   useEffect(() => {
      dispatch(characterActions.getOneById(id));
   }, [id]);

   const characterData = useSelector(
      (state) => state.characters.selectedCharacterData
   );
   const loading = useSelector((state) => state.loading);
   const error = useSelector((state) => state.error);

   let characterPage = <Spinner />;

   if (characterData.id) {
      characterPage = <CharacterBio {...characterData} />;
   }

   return <div>{characterPage}</div>;
};

export default SingleCharacterPage;
