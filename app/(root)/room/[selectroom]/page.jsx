"use client";
import { useEffect, useState, useContext,useRef } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRoomID } from "../../../../RoomIDContext";
import OCR from "../../../../components/OCR";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/supauth";
import { RoomCode } from "@/supabaseClient";
import { RealtimeClient } from "@supabase/realtime-js";
import { useSupabase } from "@/RealtimeContext";
import { fetchroomidbyuserid } from "../../../../supabaseClient";
// import { useAuther } from '../../../../AuthContext';
// import { useToken } from "@/TokenContext";

// Initialize the Supabase client with your Supabase URL and API key

// const client = new RealtimeClient(process.env.NEXT_PUBLIC_SUPREALTIME, {
//   params: {
//     apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//   },
// });
// client.connect();
export default function Room({ params }) {
  const { roomID, setRoomID } = useRoomID();
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const room = params.selectroom;
  const client=useSupabase();
  // const [Token, setToken] = useState("");

  // Adding roomid to user in supabase
  // const { token, updateToken } = useToken();

  const [database, setDatabase] = useState([]);
  const [roomCode, setRoomCode] = useState(null);
  const [Owner, setOwner] = useState("");
  const [gRoom, setgRoom] = useState(1);
  const { getToken } = useAuth();

  const fetchroomdata = async () => {
    // if(database.length!==2){
    if (user) {
      let token = await getToken({ template: "supabase" });
      if(localStorage.getItem('token')!==token){
        localStorage.setItem('token',token)
      }
      try {
        if (roomID) {
          const roomId = {
            id: roomID,
            token: token,
          };
          let store_user = await axios.post(
            "https://ludo-server-teal.vercel.app/fetchusersbyid",
            roomId,
            {
              withCredentials: true,
            }
          );
          let usersInRoom = store_user.data.message;
          console.log(store_user.data.message);
          let store_owner = await axios.post(
            "https://ludo-server-teal.vercel.app/fetchownerbyid",
            roomId,
            { withCredentials: true }
          );
          console.log(store_owner.data);
          let Ownerd = store_owner.data.message;
          // if(store_user.data.message.length===2 && user.username===Ownerd && gRoom===1){
          //   getRoomCode();
          //   setgRoom(0);
          // }
          console.log("Store user", store_user.data.message, Ownerd);
          setDatabase(usersInRoom);
          setOwner(Ownerd);
        }
      } catch (error) {
        console.log("fetchroom error");
      }
    }
    // }
  };
  const channelRef = useRef(null);

  useEffect(() => {
    // Check if the channel has not been created
    if (!channelRef.current) {
      const channel = client.channel(roomID);

      channel.on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Room",
          columns: ["roomcode"],
        },
        async (payload) => {
          try {
            let token = localStorage.getItem('token');
            console.log(token);

            let response = await axios.post(
              "/api/fetchRoomIDbyuserid",
              { token: token },
              { withCredentials: true }
            );

            let roomId = response.data;

            console.log('Room name is', roomId, payload.new.id, room);

            if (payload.new.id === Number(roomId)) {
              // alert('Roomcode is visible');
              toast.success("Room code is visible");
            }
          } catch (error) {
            console.error("Error in Axios request or PostgreSQL changes callback:", error);
          }
        }
      );

      channel.subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          console.log("Ready to receive database changes!");
        }
      });

      // Store the channel in the ref
      channelRef.current = channel;
    }

    // Clean up channel when component is unmounted
    return () => {
      // Check if channel exists before unsubscribing
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
    };
  }, [roomID]); // Add roomID to dependency array if it can change during component's lifecycle



  const channelRef2 = useRef(null);

  useEffect(() => {
    if (!channelRef2.current) {
      console.log("Room code is ", roomCode);
      if (database.length < 2) {
        fetchroomdata();
      }

      client.accessToken = localStorage.getItem("token");
      const channel = client.channel("db-user-changes");

      channel.on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "User",
          columns: ["roomid"],
        },
        (payload) => {
          console.log("All inserts in messages table: ", payload);
          fetchroomdata();
        }
      );

      channel.subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          console.log("Ready to receive database changes!");
        }
      });

      // Store the channel in the ref
      channelRef2.current = channel;
    }

    return () => {
      if (channelRef2.current) {
        channelRef2.current.unsubscribe();
        channelRef2.current = null;
      }
    };
  }, [roomID, Owner]);
// useEffect(() => {
//   let token = localStorage.getItem("token");
//   const roomId = {
//     id: roomID,
//     token: token,
//   };
//   let store_user;

//   axios
//     .post("https://ludo-server-teal.vercel.app/fetchusersbyid", roomId)
//     .then((response) => {
//       store_user = response;

//       if (
//         store_user.data.message !== null &&
//         store_user.data.message.length === 2
//       ) {
//         const token = localStorage.getItem("token");
//         console.log("getting room code");

//         axios
//           .post("/api/roomCode", JSON.stringify(token), {
//             withCredentials: true,
//           })
//           .then((response) => {
//             // console.log("The diskau code is ", response.data.code);
//             setRoomCode(response.data.code);
//             // console.log("Success!", response.data.code);
//           })
//           .catch((error) => {
//             console.log("failed!!!!", error.message);
//           });
//       }
//     })
//     .catch((error) => {
//       console.error("Error in fetching users by id:", error);
//     });
// }, [])

  function goBack(userid) {
    router.back();
    const deassignuser = async (userid) => {
      try {
        if (user) {
          const token = await getToken({ template: "supabase" });
          if(localStorage.getItem('token')!==token){
            localStorage.setItem('token',token)
          }
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

  const getRoomCode = () => {
    // setRoomCode('2334')
    if(roomCode===null ){
    let token = localStorage.getItem("token");
    const roomId = {
      id: roomID,
      token: token,
    };
    let store_user;

    axios
      .post("https://ludo-server-teal.vercel.app/fetchusersbyid", roomId)
      .then((response) => {
        store_user = response;

        if (
          store_user.data.message !== null &&
          store_user.data.message.length === 2
        ) {
          const token = localStorage.getItem("token");
          console.log("getting room code");

          axios
            .post("/api/roomCode", JSON.stringify(token), {
              withCredentials: true,
            })
            .then((response) => {
              // console.log("The diskau code is ", response.data.code);
              setRoomCode(response.data.code);
              // console.log("Success!", response.data.code);
            })
            .catch((error) => {
              console.log("failed!!!!", error.message);
            });
            if(Owner===user.username){
          axios
            .post("/api/deleteMoney", JSON.stringify(token), {
              withCredentials: true,
            })
            .then((response) => {
              // console.log("The diskau code is ", response.data.code);
              console.log('Moneeey is deducted')
              // console.log("Success!", response.data.code);
            })
            .catch((error) => {
              console.log("failed!!!!", error.message);
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error in fetching users by id:", error);
      });
    }
  };

  const handleCopy = (copyReferelId) => {
    setCopied(copyReferelId);

    navigator.clipboard.writeText(copyReferelId);
    alert("Room Code copied to your clipboard!");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <ToastContainer/>
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
        {database &&
          database.map((item, index) => (
            <div key={index} className="mb-1">
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
      {
      roomCode !== null && user !== undefined && roomID !== null ? (
        <OCR roomCode={roomCode} roomId={roomID} userId={user.id} username={user.username}>
          {console.log("console in ocr component:", roomCode, user, roomID)}
        </OCR>
      ) : (
        <div>Loading</div>
      )
      }
    </div>
  );
}
