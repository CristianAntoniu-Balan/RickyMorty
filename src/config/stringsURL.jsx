export const baseURL = 'https://rickandmortyapi.com/api';

export const get = {
   characters: '/character',
   locations: '/location',
   episodes: '/episode',
};

export const queryCharacterBy = {
   id: 'id',
   name: 'name',
   status: 'status',
   species: 'species',
   type: 'type',
   gender: 'gender',
};

export const initQueryInfo = {
   count: 0,
   pages: 'pages',
   next: null,
   prev: null,
};

export const queryLocationBy = {
   name: 'name',
   type: 'type',
   dimension: 'dimension',
};

export const queryEpisodeBy = {
   name: 'name',
   episodeCode: 'episode',
};

export const queryPage = 'page=';
export const fetchPageItemsCount = 20;
