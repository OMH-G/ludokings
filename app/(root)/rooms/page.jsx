"use client";
import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import axios from "axios";
import { useUser, clerkClient } from "@clerk/nextjs";
import { useEffect } from "react";
import { createRoomInSupabase } from "../../../supabaseClient";
import { assignroomid_user } from "../../../supabaseClient";
import { useRoomID } from "../../../RoomIDContext";
import { deleteroom } from "../../../supabaseClient";
export default function Rooms() {
  async function fetchSupabaseData() {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      const tableName = "Room"; // Replace with your table name
      const apiUrl = `${supabaseUrl}/rest/v1/${tableName}`;

      const response = await axios.get(apiUrl, {
        headers: {
          apikey: supabaseKey,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Error fetching data:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  const [rooms, setRooms] = useState([]);

  const { roomID, setRoomID } = useRoomID();

  const { isLoaded, isSignedIn, user } = useUser();
  const [newRoomName, setNewRoomName] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      const supabaseData = await fetchSupabaseData();
      if (supabaseData) {
        setRooms(supabaseData);
      }
    }

    fetchData();
  }, [rooms]);

  const addRoom = () => {
    if (newRoomName !== "") {
      const newRoom = {
        name: newRoomName,
        value: newValue,
      };

      setNewRoomName("");
      setNewValue("");
    }
    const createRoom = async () => {
      try {
        if (user) {
          // Create the user in Supabase with their user ID
          let data = await createRoomInSupabase(
            user.id,
            newRoomName,
            newValue,
            user.username
          );
          setRooms(...rooms, data);
          console.log("Room created in Supabase");
        }
      } catch (error) {
        console.error("Error creating Room in Supabase:", error);
      }
    };

    // Call the createUser function when the user is authenticated
    if (user) {
      createRoom();
    }
  };

  const join = (roomname) => {
    console.log("Join clicked");
    setJoin(1);
    setChoosenRoom(roomname);
  };

  const updateRoomValue = (index, updatedValue) => {
    const updatedRooms = [...rooms];
    updatedRooms[index].value = updatedValue;
    setRooms(updatedRooms);
  };

  const removeRoom = (index, roomid) => {
    const updatedRooms = [...rooms];
    deleteroom(user.id, roomid);
    updatedRooms.splice(index, 1);
    setRooms(updatedRooms);
  };

  const playbuttonclicked = (roomid, userid) => {
    setRoomID(roomid);
    const assignuser = async (roomid, userid) => {
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

  const getUserFromClerk = async () => {
    try {
      const userId = user_2VeZDRvMP3Lw2eleP6OjynhSAff;
      const response = await axios.post("/api/getUserFromClerk", userId);
      console.log(response.data);
    } catch (error) {
      console.log("failed! to get username!!!", error.message);
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
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
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
        {Array.isArray(rooms) ? (
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
                  <button
                    className="bg-red-500 text-white px-2 md:px-4 py-1 md:py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                    onClick={() => removeRoom(index, room.id)}
                  >
                    <DeleteIcon />
                  </button>
                </span>
              </span>
            </li>
          ))
        ) : (
          <div>Loading</div>
        )}
      </ul>
    </div>
  );
}
