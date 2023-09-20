"use client";
import { useUser } from "@clerk/nextjs";
// import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import { createUserInSupabase } from "../../supabaseClient"; // Import the createUserInSupabase function
export default function Home() {
  const { user } = useUser();

  // Use an effect to create the user in Supabase when the user is authenticated
  useEffect(() => {
    const createUser = async () => {
      try {
        if (user) {
          // Create the user in Supabase with their user ID
          await createUserInSupabase(user.id);
          // console.log('User created in Supabase');
        }
      } catch (error) {
        console.error("Already login");
      }
    };

    // Call the createUser function when the user is authenticated
    if (user) {
      createUser();
    }
  }, [user]);

  return <div className="app">{/* Your UI components */}</div>;
}
