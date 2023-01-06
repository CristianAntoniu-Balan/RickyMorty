import React from 'react';
import styles from './characters-table.module.css';
import { tableConfig } from '../../config/stringsTable';
import { apiOptions } from '../../config/stringsURL';
import TableHeaderElement from '../table-header-element/table-header-element';

const tableHeader = tableConfig[apiOptions.characters].map((el) => (
   <TableHeaderElement
      key={el.header}
      item={el}
   />
));

const classes = [styles.characterTableLayout, styles.headerRow].join(' ');

const CharactersHeader = () => {
   return <div className={classes}>{tableHeader}</div>;
};

export default CharactersHeader;
