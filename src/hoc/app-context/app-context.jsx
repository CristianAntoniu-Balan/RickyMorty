import React, { useState, createContext, useContext } from 'react';

import { apiOptions } from '../../config/stringsURL';

const initialState = {
   context: apiOptions.characters,
   setContext: () => {},
};

const AppContext = createContext(initialState);

export const AppContextProvider = ({ children }) => {
   const [localContext, setLocalContext] = useState(apiOptions.characters);
   return (
      <AppContext.Provider value={{ localContext, setLocalContext }}>
         {children}
      </AppContext.Provider>
   );
};

const useAppContext = () => {
   const context = useContext(AppContext);

   if (context === undefined) {
      throw new Error('no context provider');
   }
   return context;
};

export default useAppContext;
