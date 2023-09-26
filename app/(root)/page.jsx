"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();

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

  return (
    <div className="app">
      Yet to update
      <br />
    </div>
  );
}
