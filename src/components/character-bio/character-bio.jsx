import React from 'react';

import { formatDate } from '../../utils/utils';

import styles from './character-bio.module.css';

const CharacterBio = ({
   id,
   name,
   status,
   species,
   type,
   gender,
   origin,
   location,
   image,
   created,
}) => {
   const genderSymbol = {
      male: '\u2642 ',
      female: '\u2640 ',
      genderless: '\u2205 ',
      unknown: '? ',
   };

   const genderDisplay = genderSymbol[gender.toLowerCase()] + gender;

   const dateDisplay = formatDate(created);

   const bioArray = [
      ['Id', id],
      ['Status', status],
      ['Species', species],
      ['Type', type],
      ['Gender', genderDisplay],
      ['Origin', origin.name],
      ['Location', location.name],
      ['Created', dateDisplay],
   ];

   const bioElement = bioArray.map((el) => (
      <div
         className={styles.characterBioTag}
         key={el[0]}
      >
         <span>{el[0]}</span>
         <span>{el[1] || 'N/A'}</span>
      </div>
   ));

   return (
      <div className={styles.characterBio}>
         <div className={styles.imgContainer}>
            <img
               src={image}
               alt="Character"
               loading="lazy"
               id="character"
            ></img>
            <div>{name}</div>
         </div>
         <div className={styles.personalInfo}>{bioElement}</div>
      </div>
   );
};

export default CharacterBio;
