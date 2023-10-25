"use client";
import { useUser, useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";
import Image from "next/image";
import LudoHero from "@/assets/ludo.jpg";
import Link from "next/link";
import { useToken } from "@/TokenContext";

export default function Home() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { token, updateToken } = useToken();

  useEffect(() => {
    const checkUser = async () => {
      if (user) {
        
        const a = await getToken({ template: "supabase" });
        // updateToken(a);
        localStorage.setItem('token',a)
        try {
          const userData = {
            userId: user.id,
            username: user.username,
          };
          // console.log(token);
          const response = await axios.post("https://ludo-server-teal.vercel.app/addUserToDB",{"token":a}, {
            withCredentials: true,
          });

          console.log(response.data.message);
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
    <div className="flex justify-center items-center ">
      <div className="flex flex-col justify-between items-center border-2 border-blue-800 w-11/12 md:w-1/2 p-2 rounded-sm">
        <Image
          src={LudoHero}
          alt="LudoHero Image"
          width={500}
          height={900}
          className=" h-full md:h-1/2 rounded-sm"
        />
        <div className="flex flex-row justify-between items-center text-sm text-center md:my-4">
          <span className="bg-gray-100 rounded-md m-2 p-2">
            Instant Withdrawl
          </span>
          <span className="bg-gray-100 rounded-md m-2 p-2">5% Commission</span>
          <span className="bg-gray-100 rounded-md m-2 p-2">24/7 Support</span>
        </div>

        <Link
          className="w-full md:w-5/6 rounded-md bg-blue-400 text-white py-2 text-center md:mb-4"
          href="/rooms"
          alt="Play button."
        >
          Play Game
        </Link>
      </div>
    </div>
  );
}
