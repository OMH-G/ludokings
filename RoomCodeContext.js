// MyContext.js
"use client";
import { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [myInteger, setMyInteger] = useState(0);

  const updateInteger = (newValue) => {
    setMyInteger(newValue);
  };

  return (
    <MyContext.Provider value={{ myInteger, updateInteger }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
