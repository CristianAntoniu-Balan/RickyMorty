import React from 'react';

import styles from './character-bio-tag.module.css';

const CharacterBioTag = ({ tagName, tagValue }) => {
   return (
      <div className={styles.characterBioTag}>
         <span>{`${tagName}:`}</span>
         <span>{tagValue || 'undefined'}</span>
      </div>
   );
};

export default CharacterBioTag;
