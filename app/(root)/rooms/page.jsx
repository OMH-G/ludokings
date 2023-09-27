"use client";
import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import axios from "axios";
import { useUser, clerkClient } from "@clerk/nextjs";
import { useEffect } from "react";
import { assignroomid_user } from "../../../supabaseClient";
import { useRoomID } from "../../../RoomIDContext";
import { createClient } from "@supabase/supabase-js";
// Initialize the Supabase client with your Supabase URL and API key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  const { roomID, setRoomID } = useRoomID();

  const { isLoaded, isSignedIn, user } = useUser();
  const [newRoomName, setNewRoomName] = useState("");
  const [newValue, setNewValue] = useState(0);
  const [chips, setChips] = useState("");

  useEffect(() => {
    const getUserChips = async () => {
      if (user) {
        try {
          const userId = user.id;
          const response = await axios.post("/api/getChips", user);
          console.log(response);
          setChips(response.data);
        } catch (error) {
          console.error("Error fetching user's chips: ", error);
        }
      }
    };
    getUserChips();
  }, [user]);

  useEffect(() => {
    console.log("database change occured");
    const Room = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Room" },
        (payload) => {
          console.log("Change received!", payload);
          fetchRooms();
        }
      )
      .subscribe();

    // console.log("Success!", response.data.code);
  }, [user]);

  const fetchRooms = async () => {
    if (user) {
      try {
        const response = await axios.get("/api/fetchRooms");
        console.log(response.data.roomArray);
        if (response.data.roomArray.length >= 1) {
          setRooms(response.data.roomArray);
        }
      } catch (error) {
        console.log("Failed to retrieve rooms");
      }
    }
  };

  useEffect(() => {
    const fetchRooms = async () => {
      if (user) {
        try {
          const response = await axios.get("/api/fetchRooms");
          console.log(response.data.roomArray);
          if (response.data.roomArray.length >= 1) {
            setRooms(response.data.roomArray);
          }
        } catch (error) {
          console.log("Failed to retrieve rooms");
        }
      }
    };

    fetchRooms();
  }, [user]);

  const addRoom = () => {
    const createRoom = async () => {
      if (user) {
        try {
          const data = {
            userId: user.id,
            newRoomName,
            newValue,
            userName: user.username,
          };

          if (chips && newValue > chips) {
            alert("You do not have enough chips!");
          } else {
            let roomdata = await axios.post("/api/createRoom", data);
            setRooms(...rooms, roomdata);
          }

          // console.log(roomdata);
        } catch (error) {
          console.error("Error creating Room in Supabase:", error);
        }
      }
    };
    if (user) {
      createRoom();
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

  const join = (roomname) => {
    console.log("Join clicked");
    setJoin(1);
    setChoosenRoom(roomname);
  };

  // const updateRoomValue = (index, updatedValue) => {
  //   const updatedRooms = [...rooms];
  //   updatedRooms[index].value = updatedValue;
  //   setRooms(updatedRooms);
  // };

  const removeRoom = async (index, roomid) => {
    if (user && roomid) {
      try {
        const updatedRooms = [...rooms];
        const data = {
          userId: user.id,
          roomId: roomid,
        };

        const response = await axios.post("/api/deleteRoom", data);
        fetchRooms();
        // console.log(response);
        // updatedRooms.splice(index, 1);
        // setRooms(updatedRooms);
      } catch (error) {
        console.log("Error while deleting the room");
      }
    }
  };

  const playbuttonclicked = (roomid, userid) => {
    console.log("playbutton");
    const assignuser = async (roomid, userid) => {
      let supabaseData = await axios.post("/api/fetchRoomById", roomid);
      if (supabaseData.data.length === 2) {
        setRoomID(null);
        alert("Already player exist");
        console.log("Not forward");
        return;
      } else {
        setRoomID(roomid);
      }
      try {
        if (user) {
          // Create the user in Supabase with their user ID
          await assignroomid_user(roomid, userid);
          console.log("User updated with room");
        }
      } catch (error) {
        console.error("Error creating Room in Supabase:", error);
      }
    };

    // Call the createUser function when the user is authenticated
    if (user) {
      assignuser(roomid, userid);
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
        <Button
          variant="contained"
          color="primary"
          onClick={addRoom}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        >
          Set
        </Button>
      </div>
      <ul className="w-11/12 md:w-1/2">
        {/* <button onClick={getUserFromClerk}>getUserFromClerk</button> */}
        {Array.isArray(rooms) &&
          rooms.map((room, index) => (
            <li key={index} className="mb-4">
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
                      onClick={() => playbuttonclicked(room.id, user?.id)}
                    >
                      Play
                    </button>
                  </Link>
                  {/* {user?.id == room?.owned_by ? ( */}
                  <button
                    className="bg-red-500 text-white px-2 md:px-4 py-1 md:py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                    onClick={() => removeRoom(index, room.id)}
                  >
                    <DeleteIcon />
                  </button>
                </span>
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
