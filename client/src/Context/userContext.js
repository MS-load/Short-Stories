import React, {createContext} from 'react';

const userContext = createContext({user: {}}); // Create a context object

export {
  userContext // Export it so it can be used by other Components
};

