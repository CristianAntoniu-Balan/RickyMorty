import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

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

   // const characterBio = <div></div>;

   const characterPage = (
      <div>
         <div>{`Single Character Page id = ${id}`}</div>
         <CharacterBio {...characterData} />
      </div>
   );

   return characterPage;
   // <div>{`Single Character Page id = ${id}`}</div>;
};

export default SingleCharacterPage;
