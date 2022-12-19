import * as url from '../config/stringsURL';
import * as error from '../config/stringsError';

const getTotalOfCharacterPages = fetch(url.baseURL + url.get.characters)
   .then((res) => res.json())
   .then((data) => data.info.pages)
   .catch(() => {
      throw new Error(error.fetchAllCharacters);
   });

const getCharactersForPageNo = async (page) => {
   let chars = [];
   await fetch(
      url.baseURL + '/' + url.get.characters + '?' + url.queryPage + page
   )
      .then((res) => res.json())
      .then((data) => {
         chars = [...data.results];
      })
      .catch(() => {
         throw new Error(error.fetchAllCharacters);
      });
   return chars;
};

export async function getAllCharacters() {
   let characters = [];
   const pages = await getTotalOfCharacterPages;
   for (let i = 1; i <= pages; i++) {
      const chars = await getCharactersForPageNo(i);
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

// TODO getCharacterByQuery(queryString)
