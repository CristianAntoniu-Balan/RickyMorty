import { api, apiOptions } from './stringsURL';
// TODO define column-templates here?
// TODO canFilter -> query vs. local (!)
export const tableConfig = {
   [apiOptions.characters]: [
      {
         id: api[apiOptions.characters].queryBy.id,
         header: 'Id.',
         canSort: true,
         canFilter: false,
         defaultFilter: '',
         value: api[apiOptions.characters].response.id,
      },
      {
         id: 'image',
         header: 'Image',
         canSort: false,
         canFilter: false,
      },
      {
         id: api[apiOptions.characters].queryBy.name,
         header: 'Name',
         canSort: true,
         canFilter: true,
         defaultFilter: 'testDefaultName',
      },
      {
         id: api[apiOptions.characters].queryBy.status,
         header: 'Status',
         canSort: true,
         canFilter: true,
         defaultFilter: '',
         filterOptions: ['', 'Alive', 'Dead', 'unknown'],
      },
      {
         id: api[apiOptions.characters].queryBy.species,
         header: 'Species',
         canSort: true,
         canFilter: true,
         defaultFilter: '',
      },
      {
         id: api[apiOptions.characters].queryBy.type,
         header: 'Type',
         canSort: true,
         canFilter: true,
         defaultFilter: '',
      },
      {
         id: api[apiOptions.characters].queryBy.gender,
         header: 'Gender',
         canSort: true,
         canFilter: true,
         defaultFilter: '',
         filterOptions: ['', 'Male', 'Female', 'Genderless', 'unknown'],
      },
      {
         id: 'origin',
         header: 'Origin',
         canSort: true,
         canFilter: true,
         defaultFilter: '',
      },
      {
         id: 'location',
         header: 'Location',
         canSort: true,
         canFilter: true,
         defaultFilter: '',
      },
   ],

   [apiOptions.episodes]: [
      {
         id: api[apiOptions.episodes].queryBy.id,
         header: 'Id.',
         canSort: true,
         canFilter: true,
         defaultFilter: '',
      },
      {
         id: api[apiOptions.episodes].queryBy.name,
         header: 'Name',
         canSort: true,
         canFilter: true,
         defaultFilter: '',
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
         canFilter: false,
         defaultFilter: '',
      },
   ],

   [apiOptions.locations]: [
      {
         id: api[apiOptions.locations].queryBy.id,
         header: 'Id.',
         canSort: true,
         canFilter: true,
         defaultFilter: '',
      },
      {
         id: api[apiOptions.locations].queryBy.name,
         header: 'Name',
         canSort: true,
         canFilter: true,
         defaultFilter: '',
      },
      {
         id: api[apiOptions.locations].queryBy.type,
         header: 'Type',
         canSort: true,
         canFilter: true,
         defaultFilter: '',
      },
      {
         id: api[apiOptions.locations].queryBy.dimension,
         header: 'Dimension',
         canSort: true,
         canFilter: true,
         defaultFilter: '',
      },
   ],
};
