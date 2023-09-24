"use client";
import { useEffect, useState, useContext } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { deassignroomid_user } from "../../../../supabaseClient";
import { useRoomID } from "../../../../RoomIDContext";
import { fetchroomidbyuserid } from "../../../../supabaseClient";
export default function Room({ params }) {
  const { roomID, setRoomID } = useRoomID();

  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const room = params.selectroom;
  // Adding roomid to user in supabase

  const [database, setDatabase] = useState([]);

  const [roomCode, setRoomCode] = useState("");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    getRoomCode();
  }, []);

  useEffect(() => {
    console.log('ownerlogicfixing',database)
    if (isLoaded) {
      async function fetchroomdata() {
        if (roomID !== null && database.length===0) {
          let supabaseData = await axios.post("/api/fetchRoomById", roomID);
          if (supabaseData) {
            setDatabase(supabaseData.data);
          }
        } else {
          let supabaseData = await fetchroomidbyuserid(user.id);
          if (supabaseData) {
            setRoomID(supabaseData);
          }
        }
      }

      fetchroomdata();
    }
  });

  function goBack(userid) {
    console.log(roomID);
    router.back();
    const deassignuser = async (userid) => {
      try {
        if (user) {
          // Create the user in Supabase with their user ID
          await deassignroomid_user(userid);
          console.log("User updated with room");
        }
      } catch (error) {
        console.error("Error creating Room in Supabase:", error);
      }
    };

    // Call the createUser function when the user is authenticated
    if (user) {
      deassignuser(userid);
    }
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
    alert("Room Code copied to your clipboard!");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-start items-center w-11/12 md:w-1/2">
        <button
          onClick={() => goBack(user?.id)}
          className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Go Back
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center w-11/12 md:w-1/2 my-4 md:my-12">
        <p className="text-2xl">Waiting Room For </p>{" "}
        <span className="text-red-400 font-bold text-2xl mx-1">
          {" "}
          {database && database[room]} :
        </span>
      </div>
      <div className="flex flex-col justify-center items-center w-11/12 md:w-1/2 my-4">
        <h3 className="text-xl font-semibold mb-2">Players in the room:</h3>
        {/* {console.log("database", database)} */}
        {database &&
          database.map((item, index) => (
            <div key={index} className="mb-1">
              {/* {checkUserInSupabase(item["user_id"]).name} */}
              {item["name"]}
            </div>
          ))}
      </div>
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
