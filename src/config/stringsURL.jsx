export const baseURL = 'https://rickandmortyapi.com/api';

export const apiOptions = {
   characters: 'characters',
   locations: 'locations',
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
      response: {
         id: '',
         name: '',
         status: '',
         species: '',
         type: '',
         gender: '',
         origin: {
            name: '',
            url: '',
         },
         location: {
            name: '',
            url: '',
         },
         image: '',
         episode: [],
         url: '',
         created: '',
      },
   },
   [apiOptions.locations]: {
      path: '/location/',
      queryBy: {
         id: 'id',
         name: 'name',
         type: 'type',
         dimension: 'dimension',
      },
      response: {
         id: '',
         name: '',
         type: '',
         dimension: '',
         residents: [],
         url: '',
         created: '',
      },
   },
   [apiOptions.episodes]: {
      path: '/episode/',
      queryBy: {
         id: 'id',
         name: 'name',
         episodeCode: 'episode',
      },
      response: {
         id: '',
         name: '',
         air_date: '',
         episode: '',
         characters: [],
         url: '',
         created: '',
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

// API_ITEMS_PER_PAGE (!) see API docs -> https://rickandmortyapi.com/documentation/#introduction
export const API_ITEMS_PER_PAGE = 20;
