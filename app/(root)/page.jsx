"use client";
import { useUser } from "@clerk/nextjs";
// import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import {
  createUserInSupabase,
  checkUserInSupabase,
} from "../../supabaseClient";
export default function Home() {
  const { user } = useUser();

  // Use an effect to create the user in Supabase when the user is authenticated
  useEffect(() => {
    const checkUser = async () => {
      try {
        if (user) {
          const isUserInSupabase = await checkUserInSupabase(user.id);
          console.log(isUserInSupabase[0].name);

          if (!isUserInSupabase[0].name) {
            await createUserInSupabase(user.id);
          } else {
            console.log("User already exists");
          }
        }
      } catch (error) {
        console.log("User does not found");
      }
    };

    // Call the checkUser function when the user is authenticated
    if (user) {
      checkUser();
    }
  }, [user]);

  return (
    <div className="app">
      Yet to update{/* Your UI components */}
      <br />
      {/* <button onClick={checkUser}>user</button> */}
    </div>
  );
}
