import { name as pageSliceName } from '../slices/page-slice';
import { name as sortSliceName } from '../slices/sort-slice';
import { name as querySliceName } from '../slices/query-slice';

export const addContext = (store) => (next) => (action) => {
   const sliceNamesWithContext = [pageSliceName, sortSliceName, querySliceName];
   if (
      sliceNamesWithContext.some((sliceName) =>
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

// TODO not ok
export const trimTimeout = (store) => (next) => (action) => {
   const sliceNamesWithTrimTimeout = [querySliceName];
   console.log(
      'herehere',
      sliceNamesWithTrimTimeout.some((sliceName) =>
         action.type.startsWith(`${sliceName}/`)
      )
   );
   if (
      sliceNamesWithTrimTimeout.some((sliceName) =>
         action.type.startsWith(`${sliceName}/`)
      )
   ) {
      console.log('here');
      setTimeout(() => {
         console.log('timed out');
         return next(action);
      }, 500);
   } else next(action);
};
