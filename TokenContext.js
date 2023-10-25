
"use client";
import React, { createContext, useContext, useState } from 'react';

// 1. Create a context to store the token
const TokenContext = createContext();

// 2. Create a Provider component to manage the token
function TokenProvider({ children }) {
  const [token, setToken] = useState(null);

  // Function to set the token
  const updateToken = (newToken) => {
    setToken(newToken);
  };

  return (
    <TokenContext.Provider value={{ token, updateToken }}>
      {children}
    </TokenContext.Provider>
  );
}

// 3. Create a custom hook to access the token
function useToken() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
}

export { TokenProvider, useToken };