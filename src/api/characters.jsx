import { baseURL, api, apiOptions } from '../config/stringsURL';
import * as error from '../config/stringsError';

import { queryBuilder } from '../utils/utils';
// TODO 300ms delay on query request

// TODO make generic get functions: getWithParameters <- apiOptions

const getTotalOfCharacterPages = fetch(
   baseURL + api[apiOptions.characters].path
)
   .then((res) => res.json())
   .then((data) => data.info.pages)
   .catch(() => {
      throw new Error(error.fetchAllCharacters);
   });

export async function getCharactersForQueryAndPageNo(queryOptions, page) {
   let chars = [];
   let queryInfo = {};
   const query = queryBuilder(apiOptions.characters, queryOptions, page);
   await fetch(query)
      .then((res) => res.json())
      .then((data) => {
         queryInfo = { ...data.info };
         chars = [...data.results].filter((result) => {
            return new RegExp(
               [queryOptions[api[apiOptions.characters].queryBy.id]].toString(),
               'gi'
            ).test(result[api[apiOptions.characters].queryBy.id]);
         });
      })
      .catch(() => {
         throw new Error(error.fetchAllCharacters);
      });
   return { queryInfo, chars };
}

export async function getCharactersForQueryAndPageInterval(
   query,
   startPage,
   endPage
) {
   let chars = [];
   let queryInfo = {};
   let fetchPageIndex = startPage;
   while (fetchPageIndex <= endPage) {
      const res = await getCharactersForQueryAndPageNo(query, fetchPageIndex);
      queryInfo = { ...res.queryInfo };
      chars = [...chars, ...res.chars];
      res.queryInfo.next ? fetchPageIndex++ : (fetchPageIndex = endPage + 1);
   }
   return { queryInfo, chars };
}

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
   await fetch(baseURL + api[apiOptions.characters].path + '/' + id)
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
