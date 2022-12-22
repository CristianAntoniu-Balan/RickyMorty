export const classes = (...classCollection) => {
   // TODO check logic
   let allClasses = [];
   for (const cls of classCollection) {
      allClasses.push(cls);
   }
   return allClasses.join(' ');
};
