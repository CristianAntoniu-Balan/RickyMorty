import { api, apiOptions } from './stringsURL';

export const charactersTable = [
   {
      id: api[apiOptions.characters].queryBy.id,
      header: 'Id.',
      canSort: true,
      canFilter: true,
      filterQuery: '',
   },
   {
      id: 'image',
      header: 'Image',
      canSort: false,
      canFilter: false,
      filterQuery: '',
   },
   {
      id: api[apiOptions.characters].queryBy.name,
      header: 'Name',
      canSort: true,
      canFilter: true,
      filterQuery: '',
   },
   {
      id: api[apiOptions.characters].queryBy.status,
      header: 'Status',
      canSort: true,
      canFilter: true,
      filterQuery: '',
      filterOptions: ['', 'Alive', 'Dead', 'unknown'],
   },
   {
      id: api[apiOptions.characters].queryBy.species,
      header: 'Species',
      canSort: true,
      canFilter: true,
      filterQuery: '',
   },
   {
      id: api[apiOptions.characters].queryBy.type,
      header: 'Type',
      canSort: true,
      canFilter: true,
      filterQuery: '',
   },
   {
      id: api[apiOptions.characters].queryBy.gender,
      header: 'Gender',
      canSort: true,
      canFilter: true,
      filterQuery: '',
      filterOptions: ['', 'Male', 'Female', 'Genderless', 'unknown'],
   },
];

export const episodesTable = [
   {
      id: api[apiOptions.episodes].queryBy.id,
      header: 'Id.',
      canSort: true,
      canFilter: true,
   },
   {
      id: api[apiOptions.episodes].queryBy.name,
      header: 'Name',
      canSort: true,
      canFilter: true,
   },
   {
      id: 'air_date',
      header: 'Air Date',
      canSort: true,
      canFilter: false,
   },
   {
      id: api[apiOptions.episodes].queryBy.episodeCode,
      header: 'Code',
      canSort: true,
   },
];

export const locationsTable = [
   {
      id: api[apiOptions.locations].queryBy.id,
      header: 'Id.',
      canSort: true,
      canFilter: true,
   },
   {
      id: api[apiOptions.locations].queryBy.name,
      header: 'Name',
      canSort: true,
      canFilter: true,
   },
   {
      id: api[apiOptions.locations].queryBy.type,
      header: 'Type',
      canSort: true,
      canFilter: true,
   },
   {
      id: api[apiOptions.locations].queryBy.dimension,
      header: 'Dimension',
      canSort: true,
      canFilter: true,
   },
];
