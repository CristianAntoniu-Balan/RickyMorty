import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as characterActions from '../../redux-toolkit/actions/character-actions';

import * as path from '../../config/stringsPath';

import styles from './character-table.module.css';
// import Spinner from '../spinner/spinner';

const CharacterRow = ({ charInfo }) => {
   const navigate = useNavigate();
   // const dispatch = useDispatch();

   const handleClick = (id) => {
      // dispatch(characterActions.getOneById(id));
      navigate(path.to.singleCharacter + `/${id}`);
   };

   return (
      <div
         className={styles.characterTableLayout}
         onClick={() => handleClick(charInfo.id)}
      >
         <div>{charInfo.id}</div>
         <div className={styles.imgContainer}>
            {/* <Spinner /> */}
            <img
               src={charInfo.image}
               alt="Character"
               loading="lazy"
            ></img>
         </div>
         <div>{charInfo.name}</div>
         <div>{charInfo.status}</div>
         <div>{charInfo.species}</div>
         <div>{charInfo.type}</div>
         <div>{charInfo.gender}</div>
      </div>
   );
};

export default CharacterRow;
