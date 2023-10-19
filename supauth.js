import { createClient } from "@supabase/supabase-js";
// Initialize the Supabase client with your Supabase URL and API key
// export function supabaseAuth() {
  export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    // { global: { headers: { Authorization: `Bearer ${auth}` } } }
  );
//   return supabase;
// }
