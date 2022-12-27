import { baseURL, api } from '../config/stringsURL';

export const classes = (...classCollection) => {
   // TODO check logic
   let allClasses = [];
   for (const cls of classCollection) {
      allClasses.push(cls);
   }
   return allClasses.join(' ');
};

export const formatDate = (date) => new Date(date).toLocaleString();

const queryPage = (page) => {
   return Number.isInteger(page) && page > 0 ? `page=${page}` : '';
};

const queryString = (queryOptions) => {
   // let queryString = baseURL + getSomething.path + '/?';
   let queryString = '';

   // queryString += api[getSomething].path + '?';

   for (const [key, value] of Object.entries(queryOptions)) {
      value !== '' && (queryString += `${key}=${value}&`);
   }

   // queryString += Number.isInteger(page) && page > 0 ? `page=${page}` : '';

   // return (queryString.length ? '?' : '') + queryString;
   return queryString.slice(0, -1);
};

export const apiQueryBuilder = (queryOptions, page) => {
   let apiQuery = '';

   queryString(queryOptions).length
      ? (apiQuery += `?${queryString(queryOptions)}`)
      : (apiQuery += '');
   apiQuery.length
      ? (apiQuery += `&${queryPage(page)}`)
      : (apiQuery += queryPage(page).length && `?${queryPage(page)}`);

   return apiQuery;
};

export const localQueryBuilder = (
   queryOptions,
   { currentPage, itemsPerPage }
) => {
   // TODO local sort query
   let localQuery = `?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`;

   queryString(queryOptions).length
      ? (localQuery += `&${queryString(queryOptions)}`)
      : (localQuery += '');

   return localQuery;
};

const localQueryParser = (localQueryString) => {
   // TODO make check logic
   // console.log(localQueryString);
   if (localQueryString.length) {
      let queryOptionsArray = localQueryString
         .slice(1)
         .split('&')
         .map((el) => el.split('='));
      // console.log('testParser -> ', queryOptionsArray);

      return queryOptionsArray;
   } else {
      return [];
   }
};

export function updatedStateObject(stateObject, localQueryString) {
   let updatedObject = {};

   localQueryParser(localQueryString).length &&
      localQueryParser(localQueryString).forEach(([queryItem, queryValue]) => {
         // console.log(
         //    'check -> ',
         //    [queryItem] in stateObject,
         //    queryItem,
         //    queryValue
         // );
         [queryItem] in stateObject &&
            Object.assign(updatedObject, { [queryItem]: queryValue });
      });

   return updatedObject;
}
