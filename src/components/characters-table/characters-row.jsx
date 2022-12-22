import React from 'react';

import { useNavigate } from 'react-router-dom';

import * as path from '../../config/stringsPath';

import styles from './character-table.module.css';

const CharacterRow = ({ charInfo }) => {
   const navigate = useNavigate();

   const handleClick = (id) => {
      navigate(path.to.singleCharacter + `/${id}`);
   };

   const elementsArray = [
      ['Id', charInfo.id],
      ['Image', charInfo.image],
      ['Name', charInfo.name],
      ['Status', charInfo.status],
      ['Species', charInfo.species],
      ['Type', charInfo.type],
      ['Gender', charInfo.gender],
   ];

   const row = elementsArray.map((element) => {
      if (element[0] === 'Image') {
         return (
            <div
               key={element[0]}
               className={styles.imgContainer}
            >
               <img
                  src={element[1]}
                  alt="Character"
                  loading="lazy"
               ></img>
            </div>
         );
      } else {
         return <div key={element[0]}>{element[1]}</div>;
      }
   });

   return (
      <div
         className={styles.characterTableLayout}
         onClick={() => handleClick(charInfo.id)}
      >
         {row}
      </div>
   );
};

export default CharacterRow;
