import { createAction } from '@reduxjs/toolkit';

export const forward = createAction('pageForward');

export const back = createAction('pageBack');

export const toNumber = createAction('pageToNumber');
