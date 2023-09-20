"use client";
import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { createRoomInSupabase } from "../../../supabaseClient"; // Import the createUserInSupabase function
import { assignroomid_user } from "../../../supabaseClient"; // Import the createUserInSupabase function
import { useRoomID } from "../../../RoomIDContext";

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
  }, []);

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
          let data = await createRoomInSupabase(user.id, newRoomName, newValue);
          console.log(data);
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

  const removeRoom = (index) => {
    const updatedRooms = [...rooms];
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
        {rooms.map((room, index) => (
          <li key={index} className="mb-4">
            <span className="flex justify-between items-center">
              <p>
                Room
                <span className="text-red-400 font-bold"> {room.name}</span> Set
                By:{room.owned_by}
              </p>
              <p className="text-green-400 font-bold text-lg">
                {" "}
                ₹ {room.value}
              </p>
            </span>

            <span className="flex justify-between items-center">
              <p className="text-blue-400">{user?.fullName}</p>
              <span>
                <Link href={`/room/${room.name}`}>
                  <button
                    className="bg-green-500 text-white px-2 md:px-4 py-1 md:py-2 mx-1 rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                    onClick={() => playbuttonclicked(room.id, user.id)}
                  >
                    Play
                  </button>
                </Link>
                <button
                  className="bg-red-500 text-white px-2 md:px-4 py-1 md:py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                  onClick={() => removeRoom(index)}
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
