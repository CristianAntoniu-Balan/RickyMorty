import React from 'react';

const ascArrow = <span>&#8679; </span>;
const descArrow = <span>&#8681; </span>;

const SortArrow = ({ sortType }) => {
   return (
      <span>
         {sortType === 1 ? ascArrow : sortType === -1 ? descArrow : ''}
      </span>
   );
};

export default SortArrow;
