import React from 'react';

import CharacterBioTag from '../character-bio-tag/character-bio-tag';

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
      <CharacterBioTag
         key={el[0]}
         tagName={el[0]}
         tagValue={el[1]}
      />
   ));
   // TODO make component for each personal info tag-value
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
