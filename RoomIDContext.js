// RoomIDContext.js
"use client";
import { createContext, useState, useContext } from 'react';

const RoomIDContext = createContext();

export function RoomIDProvider({ children }) {
  const [roomID, setRoomID] = useState(null);

  return (
    <RoomIDContext.Provider value={{ roomID, setRoomID }}>
      {children}
    </RoomIDContext.Provider>
  );
}

export function useRoomID() {
  return useContext(RoomIDContext);
}
