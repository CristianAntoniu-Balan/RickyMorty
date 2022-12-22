import { queryCharacterBy } from './stringsURL';

export const charactersTable = [
   {
      id: queryCharacterBy.id,
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
      id: queryCharacterBy.name,
      header: 'Name',
      canSort: true,
      canFilter: true,
      filterQuery: '',
   },
   {
      id: queryCharacterBy.status,
      header: 'Status',
      canSort: true,
      canFilter: true,
      filterQuery: '',
      filterOptions: ['', 'Alive', 'Dead', 'unknown'],
   },
   {
      id: queryCharacterBy.species,
      header: 'Species',
      canSort: true,
      canFilter: true,
      filterQuery: '',
   },
   {
      id: queryCharacterBy.type,
      header: 'Type',
      canSort: true,
      canFilter: true,
      filterQuery: '',
   },
   {
      id: queryCharacterBy.gender,
      header: 'Gender',
      canSort: true,
      canFilter: true,
      filterQuery: '',
      filterOptions: ['', 'Male', 'Female', 'Genderless', 'unknown'],
   },
];

export const episodesTable = [
   {
      id: 'id',
      header: 'Id.',
      canSort: true,
   },
   {
      id: 'name',
      header: 'Name',
      canSort: true,
   },
   {
      id: 'air_date',
      header: 'Air Date',
      canSort: true,
   },
   {
      id: 'code',
      header: 'Code',
      canSort: true,
   },
];
