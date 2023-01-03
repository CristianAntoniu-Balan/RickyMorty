import React from 'react';
import styles from './table-header-element.module.css';
import SortArrow from '../00-simple-components/sort-arrow/sort-arrow';
import { useDispatch, useSelector } from 'react-redux';
import * as characterActions from '../../redux-toolkit/actions/character-actions';
import { sort } from '../../redux-toolkit/slices/sort-slice';
import { updateQueryItem } from '../../redux-toolkit/slices/query-slice';

const TableHeaderElement = ({ item }) => {
   const dispatch = useDispatch();
   const context = useSelector((state) => state.context);
   // const sortedState = useSelector((state) => state.characters.sorted);
   const sortedState = useSelector((state) => state.sort[context]);
   const queryState = useSelector((state) => state.query[context]);

   const handleClick = () => {
      // item.canSort && dispatch(characterActions.sortCharacters(item.id));
      item.canSort && dispatch(sort({ context, sortBy: item.id }));
   };

   const handleQueryChange = (value) => {
      dispatch(updateQueryItem({ context, id: item.id, value }));
   };

   const queryField = !item?.filterOptions ? (
      <input
         type="text"
         value={queryState[item.id]}
         onChange={(e) => handleQueryChange(e.target.value)}
      ></input>
   ) : (
      <select
         name={item.header}
         value={queryState[item.id]}
         onChange={(e) => handleQueryChange(e.target.value)}
      >
         {item.filterOptions.map((option) => (
            <option
               key={item.header + option}
               value={option}
            >
               {option}
            </option>
         ))}
      </select>
   );

   return (
      <div className={styles.tableHeaderElement}>
         <div>
            {item.id === sortedState.sortBy && (
               <SortArrow sortType={sortedState.sortType} />
            )}
            <span onClick={handleClick}>{item.header}</span>
         </div>
         <div>{item.canFilter && queryField}</div>
      </div>
   );
};

export default TableHeaderElement;
