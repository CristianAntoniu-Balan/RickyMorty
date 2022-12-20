import { createAction } from '@reduxjs/toolkit';

import { pageButton } from '../../config/stringsGeneric';

export const first = createAction(`${pageButton.first.txt}`);

export const prev = createAction(`${pageButton.prev.txt}`);

export const next = createAction(`${pageButton.next.txt}`);

export const last = createAction(`${pageButton.last.txt}`);

export const goToPageNumber = createAction('goToPageNumber');

export const displayPerPage = createAction('displayPerPage');

export const setLastPageNumber = createAction('setLastPageNumber');
