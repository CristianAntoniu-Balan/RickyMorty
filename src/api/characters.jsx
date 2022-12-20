import * as url from '../config/stringsURL';
import * as error from '../config/stringsError';

const getTotalOfCharacterPages = fetch(url.baseURL + url.get.characters)
   .then((res) => res.json())
   .then((data) => data.info.pages)
   .catch(() => {
      throw new Error(error.fetchAllCharacters);
   });

export async function getCharactersForQueryAndPageNo(queryOptions, page) {
   let chars = [];
   let queryInfo = {};
   const query = queryBuilder(queryOptions, page);
   await fetch(query)
      .then((res) => res.json())
      .then((data) => {
         queryInfo = { ...data.info };
         chars = [...data.results].filter((result) => {
            return new RegExp(
               [queryOptions[url.queryCharacterBy.id]].toString(),
               'gi'
            ).test(result[url.queryCharacterBy.id]);
         });
      })
      .catch(() => {
         throw new Error(error.fetchAllCharacters);
      });
   return { queryInfo, chars };
}

const queryBuilder = (queryOptions, page) => {
   let queryString = url.baseURL + url.get.characters + '/?';
   for (const [key, value] of Object.entries(queryOptions)) {
      key !== url.queryCharacterBy.id &&
         value !== '' &&
         (queryString += `${key}=${value}&`);
   }
   queryString += `page=${page}`;
   return queryString;
   // TODO
};

export async function getAllCharacters() {
   let characters = [];
   const pages = await getTotalOfCharacterPages;
   for (let i = 1; i <= pages; i++) {
      const chars = await getCharactersForQueryAndPageNo({}, i);
      characters = [...characters, ...chars];
   }
   return characters;
}

export async function getOneCharacterById(id) {
   let charData = {};
   await fetch(url.baseURL + url.get.characters + '/' + id)
      .then((res) => res.json())
      .then((data) => {
         if (data.error) {
            throw new Error(data.error);
         }
         charData = { ...data };
      })
      .catch(() => {
         throw new Error(error.fetchCharacterInfo);
      });
   return charData;
}

// TODO getCharactersByQuery(queryString)
