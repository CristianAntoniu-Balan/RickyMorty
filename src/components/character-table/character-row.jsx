import React from 'react';
import styles from './character-table.module.css';
// import Spinner from '../spinner/spinner';

const CharacterRow = ({ charInfo }) => {
   // TODO how to memoize images?
   // TODO how to cache images?
   // import { LazyLoadImage } from "react-lazy-load-image-component";
   // React Suspense ?

   return (
      <React.Fragment>
         <div className={styles.characterTableLayout}>
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
      </React.Fragment>
   );
};

export default CharacterRow;
