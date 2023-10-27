"use client";
import { createContext, useContext } from 'react';
import { RealtimeClient } from '@supabase/realtime-js';

const SupabaseContext = createContext();

// Initialize your Realtime client
const client = new RealtimeClient(process.env.NEXT_PUBLIC_SUPREALTIME, {
  params: {
    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
});
client.connect();

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
}

export function SupabaseProvider({ children }) {
  return (
    <SupabaseContext.Provider value={client}>
      {children}
    </SupabaseContext.Provider>
  );
}
