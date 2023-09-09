"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Room({ params }) {
  const { userId } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const room = params.room;

  //Temporary database which can be replace with main database with fetch or axios.
  const database = {
    Pawshar_kilo: [user?.fullName, "user2", "user3"],
    ludo_mafia: [user?.fullName, "user3", "user4"],
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomCode, setRoomCode] = useState("");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    getRoomCode();
  }, []);

  function goBack() {
    router.back();
  }

  const getRoomCode = async () => {
    try {
      const response = await axios.get("/api/roomCode");
      setRoomCode(response.data.code);
      // console.log("Success!", response.data.code);
    } catch (error) {
      console.log("failed!!!!", error.message);
    }
  };

  const handleCopy = (copyReferelId) => {
    setCopied(copyReferelId);
    navigator.clipboard.writeText(copyReferelId);
    // setTimeout(() => setCopied(false), 3000);
    alert("Room Code copied to your clipboard!");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-start items-center w-11/12 md:w-1/2">
        <button
          onClick={goBack}
          className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Go Back
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center w-11/12 md:w-1/2 my-4 md:my-12">
        <p className="text-2xl">Waiting Room For </p>{" "}
        <span className="text-red-400 font-bold text-2xl mx-1"> {room} :</span>
      </div>
      <div className="flex flex-col justify-center items-center w-11/12 md:w-1/2 my-4">
        <h3 className="text-xl font-semibold mb-2">Players in the room:</h3>
        {database[room] &&
          database[room].map((item, index) => (
            <div key={index} className="mb-1">
              {item}
            </div>
          ))}
      </div>
      {/* <div>
        {loading ? (
          <p>Loading room code...</p>
        ) : (
          <div>
            <h3 className="text-xl font-semibold mb-2">Room Code:</h3>
            <div className="bg-white p-2 rounded-lg shadow-md">
              {data.roomcode}
            </div>
          </div>
        )}
      </div> */}

      <div className="flex flex-col justify-center items-center w-11/12 md:w-1/2">
        <p>Your room code is : </p>{" "}
        <div className="my-3 text-center text-sm md:text-lg md:my-4 flex justify-center items-center px-4 md:px-12">
          <p className="bg-gray-100 py-3 px-8 border rounded-l-lg">
            {roomCode}{" "}
          </p>
          <button
            onClick={() => handleCopy(roomCode)}
            className="bg-blue-500 text-white px-4 py-3 rounded-r-lg "
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}
