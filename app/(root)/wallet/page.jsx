"use client";
import React, { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import WithdrawChipsButton from "@/components/withdrawChipsButton";
import DepositChipsButton from "@/components/depositChipsButton";
import axios from "axios";

export default function Wallet() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [chips, setChips] = useState(0);

  useEffect(() => {
    console.log(user);
    const getUserChips = async () => {
      if (user) {
        const token = await getToken({ template: "supabase" });
        try {
          const userId = user.id;
          const response = await axios.post("https://ludo-server-teal.vercel.app/getChip", {token:token}, {
            withCredentials: true,
          });
          console.log(response);
          setChips(response.data.message);
        } catch (error) {
          console.error("Error fetching user's chips: ", error);
        }
      }
    };
    getUserChips();
  }, [user]);

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="grid grid-cols-2 gap-2 md:gap-96 px-4">
        <button className="py-2 px-4 bg-blue-500 text-white rounded-lg text-md md:text-lg">
          Back
        </button>
        <button className="py-2 px-4 border border-blue-500 text-blue-500 rounded-lg text-md md:text-lg">
          Wallet History
        </button>
      </div>
      {/* <button onClick={test}>test</button> */}
      <div className="border border-gray-300 rounded-lg bg-white w-11/12 md:w-1/2 mt-4">
        <h4 className="flex justify-center items-center py-2 md:py-4 text-sm md:text-lg text-black bg-gray-100 border-b-2">
          Deposit Chips
        </h4>
        <div className="mx-2 my-1 md:text-lg md:my-4 flex justify-center items-center flex-col">
          <p className="text-blue-900 bg-blue-200 rounded-md p-4 m-4">
            These chips are Spin & Win and bought chips, only games can be
            played with them. Cannot be withdrawn in Bank or UPI !
          </p>
          <p className="flex justify-center items-center flex-col mb-4">
            Chips:<span className=" text-3xl">{chips}</span>
          </p>
          {/* <button
            onClick={depositChipsToWallet}
            className="w-11/12 bg-blue-600 text-white p-3 text-2xl rounded-lg mb-2"
          >
            Add
          </button> */}
          <DepositChipsButton />
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg bg-white w-11/12 md:w-1/2 mt-4 md:mt-8">
        <h4 className="flex justify-center items-center py-2 md:py-4 text-sm md:text-lg text-black bg-gray-100 border-b-2">
          Winning Chips
        </h4>
        <div className="mx-2 my-1 md:text-lg md:my-4 flex justify-center items-center flex-col">
          <p className="text-blue-900 bg-blue-200 rounded-md p-4 m-4">
            These chips are won from games and earned from referrals, they can
            be withdrawn in bank or UPI. Games can also be played with these
            chips
          </p>
          <p className="flex justify-center items-center flex-col mb-4">
            Chips:<span className=" text-3xl">{chips}</span>
          </p>

          <WithdrawChipsButton />
        </div>
      </div>
    </div>
  );
}
