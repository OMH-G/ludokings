"use client";
import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import axios from "axios";
import { useUser, clerkClient, useAuth } from "@clerk/nextjs";
import { useRoomID } from "../../../RoomIDContext";
import { useSupabase } from '../../../RealtimeContext';
import { useRouter } from "next/navigation";
import { supabase } from "@/supauth";

export default function Rooms() {
  
  const [rooms, setRooms] = useState([]);

  const { roomID, setRoomID } = useRoomID();
  const client=useSupabase();
  const { isLoaded, isSignedIn, user } = useUser();
  const [newRoomName, setNewRoomName] = useState("");
  const [newValue, setNewValue] = useState(0);
  const [chips, setChips] = useState("");
  const [Store, setStore] = useState('')
  // const [linkvalue, setlinkvalue] = useState("");
  const { getToken } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const getUserChips = async () => {
      if (user) {
        const token = await getToken({ template: "supabase" });
        if(localStorage.getItem('token')!==token){
          localStorage.setItem('token',token)
        }
        try {
          // const userId = user.id;

          const response = await axios.post(
            "https://ludo-server-teal.vercel.app/getChip",
            { token: token },
            {
              withCredentials: true,
            }
          );
          console.log(response.data.message);
          setChips(response.data.message);
        } catch (error) {
          console.error("Error fetching user's chips: ", error);
        }
      }
    };
    getUserChips();
  }, [rooms]);
  useEffect(() => {
    fetchRooms();
  }, [user]);
  useEffect(() => {
    const channel = client.channel("db-changes");
    

    channel.on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "Room",columns:['id'] },
      (payload) => {
        console.log("All inserts in messages table: ", payload);
        fetchRooms();
      }
    ).on(
      "postgres_changes",
      { event: "DELETE", schema: "public", table: "Room",columns:['id'] },
      (payload) => {
        console.log("All inserts in messages table: ", payload);
        fetchRooms();
      }
    )

    

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        console.log("Ready to receive database changes!");
      }
    });
    
  }, [user]);
  const fetchRooms = async () => {
    let token = await getToken({ template: "supabase" });
    if(localStorage.getItem('token')!==token){
      localStorage.setItem('token',token)
    }
    if (user) {
      try {
        const response = await axios.post(
          "https://ludo-server-teal.vercel.app/fetchroom",
          { token: token },
          {
            withCredentials: true,
          }
        );
        console.log("fetching rooms", response.data["message"]);
        setRooms(response.data["message"]);
      } catch (error) {
        console.log("Failed to retrieve rooms");
      }
    }
  };

  const addRoom = () => {
    const createRoom = async () => {
      if (user) {
        const token = await getToken({ template: "supabase" });
        if(localStorage.getItem('token')!==token){
          localStorage.setItem('token',token)
        }
        try {
          const data = {
            token,
            newRoomName,
            newValue,
          };
          console.log('Chips and newvalue',chips,newValue)
          setNewRoomName('')
          if (chips && newValue > chips) {
            alert("You do not have enough chips!");
            return;
          } else {
            console.log("setting user", rooms);
            let roomdata = await axios.post("/api/createRoom", data, {
              withCredentials: true,
            });
            console.log("asksldfkl", roomdata);
            if (roomdata.data.length !== 0) {
              setRoomID(roomdata.data[0]["id"]);
              assignuser(roomdata.data[0]["id"], user.id);
              console.log(newRoomName);

              // router.push(`/${newRoomName}`);
            }
          }

          // console.log(roomdata);
        } catch (error) {
          console.error("Error creating Room in Supabase:", error);
        }
      }
    };
    if (user) {
      createRoom();
      // fetchRooms();
    }
    if (newRoomName !== "") {
      const newRoom = {
        name: newRoomName,
        value: newValue,
      };

      setNewRoomName("");
      setNewValue("");
    }
    
  };



  const removeRoom = async (index, roomid) => {
    console.log(user, roomid);
    if (user && roomid) {
      const token = await getToken({ template: "supabase" });
      if(localStorage.getItem('token')!==token){
        localStorage.setItem('token',token)
      }
      try {
        // const updatedRooms = [...rooms];
        const data = {
          token: token,
          roomId: roomid,
        };

        const response = await axios.post("/api/deleteRoom", data, {
          withCredentials: true,
        });
      } catch (error) {
        console.log("Error while deleting the room");
      }
    }
  };

  const assignuser = async (roomid, userid) => {
    const token = await getToken({ template: "supabase" });
    if(localStorage.getItem('token')!==token){
      localStorage.setItem('token',token)
    }
    const roomId = {
      id: roomid,
      token: token,
    };

    let d = await axios.post("/api/fetchRoomById", roomId, {
      withCredentials: true,
    });
    console.log("Assigned user", d.data);
    // console.log('supabase data',d.data['message']);
    let supabaseData = d.data;
    // console.log(supabaseData);
    console.log(supabaseData);
    if (supabaseData.length === 2) {
      setRoomID(null);
      alert("Already player exist");
      console.log("Not forward");
      return;
    } else if (supabaseData !== null) {
      setRoomID(roomid);
    }
    try {
      if (user) {
        const token = await getToken({ template: "supabase" });
        let data = {
          roomid,
          token,
        };
        let assignedUser = await axios.post("/api/assignedUser", data, {
          withCredentials: true,
        });
        console.log("assigned user", assignedUser.data);
        // await assignroomid_user(roomid, userid);
      }
    } catch (error) {
      console.error("Error creating Room in Supabase:", error);
    }
  };
  const playbuttonclicked = (roomid, userid,value) => {
     if (user && chips>=value) {
      console.log('alsdfk')
      setStore(newRoomName)
      assignuser(roomid, userid);
    }
    else{
      // setNewRoomName('')
      alert('Not enough chips to enter room')
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-2xl font-bold my-4">Room Manager</p>
      <div className="mb-4 flex justify-center items-center w-11/12 md:w-1/2">
        <TextField
          label="Room Name"
          variant="outlined"
          fullWidth
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />
      </div>
      <div className="mb-4 flex justify-center items-center w-11/12 md:w-1/2">
        <TextField
          label="Chips"
          variant="outlined"
          type="number"
          value={newValue}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10); // Parse the input as an integer
            if (!isNaN(value) && value >= 0) {
              setNewValue(value); // Set the new value if it's a positive number
            }
          }}
          style={{ flex: "1", marginRight: "8px" }}
        />
       <Link href={newRoomName ? `/room/${newRoomName}` : "#"}>
          <Button
            variant="contained"
            color="primary"
            onClick={addRoom}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          >
            Set
          </Button>
        </Link>
      </div>
      <ul className="w-11/12 md:w-1/2 ">
        {/*         <button onClick={fetchRooms}>test</button> */}
        {Array.isArray(rooms) &&
          rooms.map((room, index) => (
            <li
              key={index}
              className="mb-2 md:mb-4 border border-gray-200 shadow p-2 md:p-4 rounded-md"
            >
              <span className="flex justify-between items-center">
                <p>
                  Room
                  <span className="text-red-400 font-bold">
                    {" "}
                    {room.name}
                  </span>{" "}
                  Set By:
                </p>
                <p className="text-green-400 font-bold text-lg">
                  {" "}
                  ₹ {room.value}
                </p>
              </span>

              <span className="flex justify-between items-center">
                {room.owner_name ? (
                  <p className="text-blue-400">{room.owner_name}</p>
                ) : (
                  <p className="text-blue-400">{room.owned_by}</p>
                )}

                <span>
                  
                  <Link href={`/room/${room.name}`}>
                    <button
                      className="bg-green-500 text-white px-2 md:px-4 py-1 md:py-2 mx-1 rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                      onClick={() => playbuttonclicked(room.id, user?.id,room.value)}
                    >
                      Play
                    </button>
                  </Link>
                  

                  <button
                    className="bg-red-400 text-white px-2 md:px-4 py-1 md:py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                    onClick={() => removeRoom(index, room.id)}
                  >
                    <DeleteIcon />
                  </button>

                  {/* <button
                    className="bg-red-500 text-white px-2 md:px-4 py-1 md:py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                    onClick={() => removeRoom(index, room.id)}
                  >
                    <DeleteIcon />
                  </button> */}
                </span>
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
