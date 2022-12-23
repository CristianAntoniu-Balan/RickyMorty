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

export const queryBuilder = (something, queryOptions, page) => {
   // let queryString = baseURL + getSomething.path + '/?';
   let queryString = baseURL;

   if (something && api[something]?.path) {
      queryString += api[something].path + '?';

      for (const [key, value] of Object.entries(queryOptions)) {
         key !== api[something].queryBy.id &&
            value !== '' &&
            (queryString += `${key}=${value}&`);
      }

      queryString += !isNaN(page) ? `page=${page}` : '';
   }

   return queryString;
};

export const queryParser = (path) => {};
