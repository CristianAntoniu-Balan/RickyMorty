import React from 'react';
import styles from './table-header-element.module.css';
import SortArrow from '../sort-arrow/sort-arrow';
import { useDispatch, useSelector } from 'react-redux';
import * as characterActions from '../../redux-toolkit/actions/character-actions';

const TableHeaderElement = ({ item }) => {
   const dispatch = useDispatch();
   const sortedState = useSelector((state) => state.characters.sorted);
   const filteredState = useSelector((state) => state.characters.filtered);

   const handleClick = () => {
      item.canSort && dispatch(characterActions.sortCharacters(item.id));
   };

   const handleFilterChange = (value) => {
      dispatch(characterActions.updateFilterQuery(item.id, value));
   };

   const filterField = !item?.filterOptions ? (
      <input
         type="text"
         value={filteredState[item.id]}
         onChange={(e) => handleFilterChange(e.target.value)}
      ></input>
   ) : (
      <select
         name={item.header}
         value={filteredState[item.id]}
         onChange={(e) => handleFilterChange(e.target.value)}
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
            {item.id === sortedState.by && (
               <SortArrow sortType={sortedState.type} />
            )}
            <span onClick={handleClick}>{item.header}</span>
         </div>
         <div>{item.canFilter && filterField}</div>
      </div>
   );
};

export default TableHeaderElement;
