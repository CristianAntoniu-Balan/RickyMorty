import React from 'react';

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
         <div className={styles.personalInfo}>
            <span>
               {`Id: `}
               <span>{id}</span>
            </span>
         </div>
      </div>
   );
};

export default CharacterBio;
