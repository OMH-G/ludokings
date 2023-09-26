"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
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
      if (user) {
        try {
          const userData = {
            userId: user.id,
            username: user.username,
          };
          const response = await axios.post("/api/addUserToDB", userData);

          // console.log(response);
        } catch (error) {
          console.log("User does not found");
        }
      }
    };

    // Call the checkUser function when the user is authenticated
    if (user) {
      checkUser();
    }
  }, [user]);

  // const test = async () => {
  //   if (user) {
  //     try {
  //       const userData = {
  //         userId: user.id,
  //         username: user.username,
  //       };
  //       const response = await axios.post("/api/addUserToDB", userData);

  //       console.log(response);
  //     } catch (error) {
  //       console.log("User does not found");
  //     }
  //   }
  // };

  return (
    <div className="app">
      Yet to update{/* Your UI components */}
      <br />
      {/* <button onClick={checkUser}>user</button> */}
    </div>
  );
}
