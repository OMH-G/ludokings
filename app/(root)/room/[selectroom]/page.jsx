"use client";
import { useEffect, useState, useContext } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRoomID } from "../../../../RoomIDContext";
import OCR from "../../../../components/OCR";
// import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/supauth";
import { RoomCode } from "@/supabaseClient";
// import { useAuther } from '../../../../AuthContext';

// Initialize the Supabase client with your Supabase URL and API key

export default function Room({ params }) {
  const { roomID, setRoomID } = useRoomID();
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const room = params.selectroom;
  // Adding roomid to user in supabase

  const [database, setDatabase] = useState([]);
  const [roomCode, setRoomCode] = useState(null);
  const [Owner, setOwner] = useState("");
  const { getToken } = useAuth();

  const fetchroomdata = async () => {
    if (user) {
      let token = await getToken({ template: "supabase" });
      try {
        if (roomID) {
          const roomId = {
            id: roomID,
            token: token,
          };
          let store_user = await axios.post("https://ludo-server-teal.vercel.app/fetchusersbyid", roomId, {
            withCredentials: true,
          });
          let usersInRoom = store_user.data.message;
          console.log(store_user.data.message)
          let store_owner = await axios.post(
            "https://ludo-server-teal.vercel.app/fetchownerbyid",
            roomId,
            { withCredentials: true }
          );
          console.log(store_owner.data)
          let Ownerd = store_owner.data.message;
          console.log("Store user", store_user.data.message, Ownerd);
          setDatabase(usersInRoom);
          setOwner(Ownerd);
          // console.log("Owner in room", store_owner.data, usersInRoom.data);
          // if (usersInRoom.find((obj) => obj.name === Ownerd)) {
          //   getRoomCode();
          // } else {
          //   setRoomCode(null);
          // }
        }
      } catch (error) {
        console.log("fetchroom error");
      }
    }
  };
  useEffect(() => {
    fetchroomdata();
    getRoomCode();
  },[roomID,database.length]);
  const [check, setcheck] = useState(1)
  useEffect(() => {
    console.log("Room code is ", roomCode);
    async function supToken() {
      let a = await getToken({ template: "supabase" });
      
      supabase.realtime.setAuth(a);
      const User = supabase
        .channel("custom-update-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "User" },
          (payload) => {
            console.log("user changes");
            fetchroomdata();
            // if(roomCode===null){
            //   let d=await getRoomCode();
            //   setRoomCode(d);
            // }
          }
        )
        .subscribe();
    }
    supToken();
    // if(database.length===2){
    // getRoomCode();
    // }
  }, [roomID]);

  function goBack(userid) {
    router.back();
    const deassignuser = async (userid) => {
      try {
        if (user) {
          const token = await getToken({ template: "supabase" });
          const userId = {
            token,
          };
          // await deassignroomid_user(userid);
          const response = await axios.post("/api/goBack", userId, {
            withCredentials: true,
          });
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
    // if(Owner===user?.username){
    if (roomID) {
        const token = await getToken({ template: "supabase" });
        const roomId = {
          id: roomID,
          token: token
        };
        let store_user = await axios.post("https://ludo-server-teal.vercel.app/fetchusersbyid", roomId, {
          withCredentials: true,
        });
        console.log(store_user.data.message);
        // console.log(Owner, database, roomCode);
        if (store_user.data.message.length === 2) {
          let token = await getToken({ template: "supabase" });
          // const token = await getToken({ template: "supabase" });
          console.log("getting room code");
          try {
            let response;
            response = await axios.post("https://ludo-server-teal.vercel.app/roomCode", {token:token},{withCredentials:true});
            console.log("The diskau code is ", response.data.code);
            setRoomCode( response.data.code)
            
            // setRoomCode(response.data.code);
            console.log("Success!", response.data.code);

            // const data = { id: roomID, token: JSON.parse(token) };

            // const roomValue = await axiosS.post(
            //   "/api/fetchRoomValueById",
            //   data,
            //   {
            //     withCredentials: true,
            //   }
            // );
            console.log("Response", roomValue);

            // const roomValue = await axios.post("/api/fetchRoomValueById", data);
            // console.log("roomValue:", roomValue.data);
            // const roomValueForStakes = roomValue.data;

            // if (database.length == 2) {
            //   const userData = {
            //     // userId: user.id,
            //     amount: roomValueForStakes,
            //     // database: database,
            //     name1: database[0]?.name,
            //     name2: database[1]?.name,
            //   };
            //   console.log(userData)
            //   const addStakes = await axios.post("/api/addStakes", userData);
            //   console.log("Stakes Added", addStakes);
            // }
            //  else {
            // alert("not enough players");
            // }
            // if (database) {
            //   let name = database[0].name;
            //   const getUserId = await getUserIdByName(name);
            //   console.log("getUserId", getUserId.user_id);
            // }
          } catch (error) {
            console.log("failed!!!!", error.message);
          }
        }
    } else {
      alert("Not enough player");
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
      <button
        onClick={getRoomCode}
        className="bg-blue-500 text-white px-4 py-3 rounded-lg"
      >
        Get RoomCode
      </button>
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
        <OCR roomCode={roomCode} roomId={roomID} userId={user.id}>
          {console.log("console in ocr component:", roomCode, user, roomID)}
        </OCR>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
