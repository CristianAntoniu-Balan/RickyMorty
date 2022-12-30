import { baseURL, api } from '../config/stringsURL';

export const classes = (...classCollection) => {
   // TODO not working / check
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

export const localQuery = (
   { currentPage, itemsPerPage },
   sort,
   queryOptions
) => {
   // TODO local sort query
   let localQuery = `?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`;
   localQuery += `&sortBy=${sort.by}&sortType=${sort.type}`;

   queryString(queryOptions).length
      ? (localQuery += `&${queryString(queryOptions)}`)
      : (localQuery += '');

   return localQuery;
};

const localQueryParser = (localQueryString) => {
   // TODO make check logic
   if (localQueryString.length) {
      let queryOptionsArray = localQueryString
         .slice(1)
         .split('&')
         .map((el) => el.split('='));

      return queryOptionsArray;
   } else {
      return [];
   }
};

export function updatedStateObject(stateObject, localQueryString) {
   let updatedObject = {};

   localQueryParser(localQueryString).length &&
      localQueryParser(localQueryString).forEach(([queryItem, queryValue]) => {
         [queryItem] in stateObject &&
            Object.assign(updatedObject, { [queryItem]: queryValue });
      });

   return updatedObject;
}

// export const initStateSlice = (fields, initObj) => {
//    let ret = {};
//    Object.keys(fields).forEach(
//       (key) => (ret = { ...ret, [key]: { ...initObj } })
//    );
//    return ret;
// };
