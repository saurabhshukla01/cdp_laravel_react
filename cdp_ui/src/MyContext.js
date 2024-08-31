// // MyContext.js
// import React, { createContext, useContext, useState } from 'react';

// // Create the context
// const MyContext = createContext();

// // Create a provider component
// export const MyProvider = ({ children }) => {
//   const [state, setState] = useState(null);

//   return (
//     <MyContext.Provider value={{ state, setState }}>
//       {children}
//     </MyContext.Provider>
//   );
// };

// // Custom hook to use the context
// export const useMyContext = () => {
//   return useContext(MyContext);
// };


// MyContext.js (or MyContext.tsx)
import React, { createContext, useContext, useState } from 'react';

const defaultValue = { state: null, setState: () => {} };
const MyContext = createContext(defaultValue);

export const MyProvider = ({ children }) => {
  const [state, setState] = useState(null);

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
