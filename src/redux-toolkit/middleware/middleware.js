import { name as pageSliceName } from '../slices/page-slice';
import { name as sortSliceName } from '../slices/sort-slice';
import { name as querySliceName } from '../slices/query-slice';

export const addContext = (store) => (next) => (action) => {
   const sliceNamesRequiringContext = [
      pageSliceName,
      sortSliceName,
      querySliceName,
   ];
   if (
      sliceNamesRequiringContext.some((sliceName) =>
         action.type.startsWith(`${sliceName}/`)
      )
   ) {
      const isObject =
         typeof action.payload === 'object' &&
         !Array.isArray(action.payload) &&
         action.payload !== null;

      if (!isObject) {
         action.payload = { value: action.payload };
      }

      action.payload.context = store.getState().context;
      console.log('middleware', action);
   }
   next(action);
};
