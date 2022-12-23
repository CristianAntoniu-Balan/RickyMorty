import React from 'react';

import styles from './table.module.css';

const TableRow = ({ elementsArray, clicked, addClass }) => {
   // TODO check addClass
   // TODO img alt='' attribute ?

   const row = elementsArray.map((element) => {
      if (element[0] === 'Image') {
         return (
            <div
               key={element[0]}
               className={styles.imgContainer}
            >
               <img
                  src={element[1]}
                  alt=""
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
         className={addClass}
         onClick={clicked}
      >
         {row}
      </div>
   );
};

export default TableRow;
