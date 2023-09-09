"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function UserProfile({ params }) {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="border border-black w-11/12 md:w-1/2 rounded-lg bg-white mt-4">
        <h4 className="flex justify-center items-center py-4 text-lg bg-gray-100">
          Profile
        </h4>
        <hr />
        <div className="p-8">
          {isLoaded && isSignedIn ? (
            <span className="flex items-center justify-center flex-col">
              <Image
                src={user.imageUrl}
                alt={params.id}
                width={100}
                height={100}
                className="rounded-full "
              />
              <h1 className="text-2xl my-4">Hello {user.firstName}</h1>
              <div className="text-xl p-4 flex flex-col justify-start items-start">
                <h1>email: {user?.primaryEmailAddress?.emailAddress}</h1>
              </div>
              {/* <h1>Profile Page {params.id}</h1> */}
              {/* <button onClick={() => console.log(user)}>param</button> */}
              <br />
            </span>
          ) : null}
        </div>
      </div>
      <div className="border border-black w-11/12 md:w-1/2 rounded-lg bg-white mt-4">
        <h4 className="flex justify-center items-center py-4 text-lg bg-gray-100">
          Metrics
        </h4>

        <div className="grid gap-2 md:gap-4 grid-cols-2 p-2 md:p-4">
          <div className="border border-gray-300  rounded-lg bg-white">
            <h4 className="flex justify-center items-center py-2 md:py-4 text-sm md:text-lg bg-gray-100 border-b-2">
              Games Played
            </h4>
            <p className="mx-2 my-1 font-bold md:text-lg md:my-4 flex justify-center items-center">
              0.00
            </p>
          </div>

          <div className="border border-gray-300 rounded-lg bg-white">
            <h4 className="flex justify-center items-center py-2 md:py-4 text-sm md:text-lg bg-gray-100 border-b-2">
              Chips Won
            </h4>
            <p className="mx-2 my-1 font-bold md:text-lg md:my-4 flex justify-center items-center">
              0.00
            </p>
          </div>

          <div className="border border-gray-300 rounded-lg bg-white">
            <h4 className="flex justify-center items-center py-2 md:py-4 text-sm md:text-lg bg-gray-100 border-b-2">
              Referral Earning
            </h4>
            <p className="mx-2 my-1 font-bold md:text-lg md:my-4 flex justify-center items-center">
              0.00
            </p>
          </div>

          <div className="border border-gray-300 rounded-lg bg-white">
            <h4 className="flex justify-center items-center py-2 md:py-4 text-sm md:text-lg bg-gray-100 border-b-2">
              Penalty
            </h4>
            <p className="mx-2 my-1 font-bold md:text-lg md:my-4 flex justify-center items-center">
              0.00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
