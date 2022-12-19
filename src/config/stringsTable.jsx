// export const table = {
//    id: 'Id.',
//    image: 'Image',
//    name: 'Name',
//    status: 'Status',
//    species: 'Species',
//    type: 'Type',
//    gender: 'Gender',
// };

// export const filterBy = {
//    status: {
//       alive: 'Alive',
//       dead: 'Dead',
//       unknown: 'unknown',
//    },
//    gender: {
//       male: 'Male',
//       female: 'Female',
//       genderless: 'Genderless',
//       unknown: 'unknown',
//    },
// };

export const table = [
   { id: 'id', header: 'Id.', canSort: true, canFilter: true, filterQuery: '' },
   {
      id: 'image',
      header: 'Image',
      canSort: false,
      canFilter: false,
      filterQuery: '',
   },
   {
      id: 'name',
      header: 'Name',
      canSort: true,
      canFilter: true,
      filterQuery: '',
   },
   {
      id: 'status',
      header: 'Status',
      canSort: true,
      canFilter: true,
      filterQuery: '',
      filterOptions: ['', 'Alive', 'Dead', 'unknown'],
   },
   {
      id: 'species',
      header: 'Species',
      canSort: true,
      canFilter: true,
      filterQuery: '',
   },
   {
      id: 'type',
      header: 'Type',
      canSort: true,
      canFilter: true,
      filterQuery: '',
   },
   {
      id: 'gender',
      header: 'Gender',
      canSort: true,
      canFilter: true,
      filterQuery: '',
      filterOptions: ['', 'Male', 'Female', 'Genderless', 'unknown'],
   },
];
