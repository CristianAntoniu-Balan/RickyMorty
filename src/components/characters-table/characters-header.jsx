import React from 'react';
import styles from './character-table.module.css';
import { charactersTable } from '../../config/stringsTable';
import TableHeaderElement from '../table-header-element/table-header-element';

const tableHeader = charactersTable.map((el) => (
   <TableHeaderElement
      key={el.header}
      item={el}
   />
));

const classes = [styles.characterTableLayout, styles.headerRow].join(' ');

const HeaderRow = () => {
   return <div className={classes}>{tableHeader}</div>;
};

export default HeaderRow;