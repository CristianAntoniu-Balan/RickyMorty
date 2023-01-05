import { createAction } from '@reduxjs/toolkit';

export const actionWithContext = (context, actionName) =>
   createAction(`${context}_${actionName}`);

export const addContext = (context) => {};
