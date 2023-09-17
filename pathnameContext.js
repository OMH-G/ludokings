// pathnameContext.js
"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const PathnameContext = createContext('/');

export function PathnameProvider({ children }) {
  const currentPathname = usePathname();
  const [pathname, setPathname] = useState(currentPathname);

  useEffect(() => {
    setPathname(currentPathname);
  }, [currentPathname]);

  return (
    <PathnameContext.Provider value={pathname}>
      {children}
    </PathnameContext.Provider>
  );
}

export function usePathnameContext() {
    const contextValue = useContext(PathnameContext);
    console.log(contextValue);
    if (contextValue === undefined) {
        console.log('nana chi tang');
      // You can execute a function or provide a default value here
      return '/default-path'; // Change this to your desired default value
    }
    return contextValue;
}
