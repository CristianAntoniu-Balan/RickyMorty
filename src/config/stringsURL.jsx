export const baseURL = 'https://rickandmortyapi.com/api';

export const apiOptions = {
   characters: 'characters',
   locations: 'locaitons',
   episodes: 'episodes',
};

export const api = {
   [apiOptions.characters]: {
      path: '/character/',
      queryBy: {
         id: 'id',
         name: 'name',
         status: 'status',
         species: 'species',
         type: 'type',
         gender: 'gender',
      },
   },
   [apiOptions.locations]: {
      path: '/location/',
      queryBy: {
         name: 'name',
         type: 'type',
         dimension: 'dimension',
      },
   },
   [apiOptions.episodes]: {
      path: '/episode/',
      queryBy: {
         name: 'name',
         episodeCode: 'episode',
      },
   },
};

export const initQueryInfo = {
   count: 0,
   pages: 'pages',
   next: null,
   prev: null,
};

export const queryPage = 'page=';
export const fetchPageItemsCount = 20;
