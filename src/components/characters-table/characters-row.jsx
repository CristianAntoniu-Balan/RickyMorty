import React from 'react';
import { useNavigate } from 'react-router-dom';

import TableRow from '../00-simple-components/table/table-row';

import * as path from '../../config/stringsPath';

import styles from './characters-table.module.css';

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

   return (
      <TableRow
         elementsArray={elementsArray}
         clicked={() => handleClick(charInfo.id)}
         addClass={styles.characterTableLayout}
      />
   );
};

export default CharacterRow;
