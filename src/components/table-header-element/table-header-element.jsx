import React, { useState, useEffect } from 'react';
import styles from './table-header-element.module.css';
import SortArrow from '../00-simple-components/sort-arrow/sort-arrow';
import { useDispatch, useSelector } from 'react-redux';
import * as characterActions from '../../redux-toolkit/actions/character-actions';
import { sort } from '../../redux-toolkit/slices/sort-slice';
import { updateQueryItem } from '../../redux-toolkit/slices/query-slice';

const TableHeaderElement = ({ item }) => {
   const dispatch = useDispatch();
   const context = useSelector((state) => state.context);
   const sortedState = useSelector((state) => state.sort[context]);
   const queryState = useSelector((state) => state.query[context]);
   const [value = item.value || '', setValue] = useState();

   const handleClick = () => {
      item.canSort && dispatch(sort({ sortBy: item.id }));
   };

   const handleQueryChange = (value) => {
      setValue(value);
   };

   useEffect(() => {
      const valueWithEndWhitespace = value
         .trim()
         .concat(value.length - value.trimEnd().length > 0 ? ' ' : '');

      const delayedStoreUpdate = setTimeout(() => {
         dispatch(
            updateQueryItem({ id: item.id, value: valueWithEndWhitespace })
         );
         setValue(valueWithEndWhitespace);
      }, 500);

      return () => clearTimeout(delayedStoreUpdate);
   }, [value]);

   const queryField = !item?.filterOptions ? (
      <input
         type="text"
         value={value}
         onChange={(e) => handleQueryChange(e.target.value)}
      ></input>
   ) : (
      <select
         name={item.header}
         value={value}
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
