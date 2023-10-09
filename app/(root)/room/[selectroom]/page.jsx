"use client";
import { useEffect, useState, useContext } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { deassignroomid_user } from "../../../../supabaseClient";
import { useRoomID } from "../../../../RoomIDContext";
import { fetchUserbyRoomID } from "../../../../supabaseClient";
import { fetchroomowner } from "../../../../supabaseClient";
import OCR from "../../../../components/OCR";
import { createClient } from "@supabase/supabase-js";
// Initialize the Supabase client with your Supabase URL and API key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export default function Room({ params }) {
  const { roomID, setRoomID } = useRoomID();

  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const room = params.selectroom;
  // Adding roomid to user in supabase

  const [database, setDatabase] = useState([]);

  const [roomCode, setRoomCode] = useState(null);

  const [Owner, setOwner] = useState("");

  const fetchroomdata = async () => {
    if (user) {
      try {
        if (roomID) {
          const roomId = {
            id: roomID,
          };
          let store_user=await axios.post("https://ludo-server-teal.vercel.app/fetchusersbyid", roomId);
          let usersInRoom=store_user.data['message'];
          let store_owner = await axios.post("https://ludo-server-teal.vercel.app/fetchownerbyid", roomId);
          let Ownerd=store_owner.data['message'];
          setDatabase(usersInRoom);
          console.log('Owner in room',Ownerd,usersInRoom);
          let db = usersInRoom;
          if (db.find((obj) => obj.name === Ownerd)) {
            getRoomCode();
          } else {
            setRoomCode(null);
          }
        }
      } catch (error) {
        console.log("fetchroom error");
      }
    }
  };

  useEffect(() => {
    console.log(roomID)
    fetchroomdata();
  }, [roomID,user]);

  useEffect(() => {
    const User = supabase
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "User" },
        (payload) => {
          
          fetchroomdata();
          
        }
      )
      .subscribe();
  }, [roomID,user]);

  function goBack(userid) {
    router.back();
    const deassignuser = async (userid) => {
      try {
        if (user) {
          const userId = {
            id: user.id,
          };
          // await deassignroomid_user(userid);
          const response = await axios.post("/api/goBack", userId);
          console.log("User updated with room", response);
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
    console.log("getting room code");
    try {
      const response = await axios.get("/api/roomCode");
      setRoomCode(response.data.code);
      console.log("Success!", response.data.code);
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
      {/* {console.log(database)} */}
      <div className="flex justify-start items-center w-11/12 md:w-1/2">
        <button
          onClick={() => goBack(user?.id)}
          className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Go Back
        </button>
      </div>

      <div className="flex flex-col justify-center items-center w-11/12 md:w-1/2 my-4">
        <h3 className="text-2xl font-semibold mb-2">Players in the room:</h3>
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
          {roomCode ? (
            <p className="bg-gray-100 py-3 px-8 border rounded-l-lg">
              {roomCode}{" "}
            </p>
          ) : (
            <p className="bg-gray-100 h-11 md:h-14 w-32 border rounded-l-lg">
              {" "}
            </p>
          )}
          <button
            onClick={() => handleCopy(roomCode)}
            className="bg-blue-500 text-white px-4 py-3 rounded-r-lg "
          >
            Copy
          </button>
        </div>
      </div>
      {roomCode !== null && user !== undefined && roomID !== null ? (
        
        <OCR roomCode={roomCode} roomId={roomID} userId={user.id} >{console.log(roomCode,user,roomID)}</OCR>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
