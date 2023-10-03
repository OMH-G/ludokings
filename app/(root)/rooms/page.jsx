"use client";
import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import axios from "axios";
import { useUser, clerkClient } from "@clerk/nextjs";
import { assignroomid_user, fetchRoomsById } from "../../../supabaseClient";
import { useRoomID } from "../../../RoomIDContext";
import { createClient } from "@supabase/supabase-js";
import { fetchRooms } from "../../../supabaseClient";
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
    console.log(rooms);
    fetchRooms();
    const Room = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Room" },
        (payload) => {
          console.log("Change received!", payload);
          // setRooms(payload.new);
          fetchRooms();
        }
      )
      .subscribe();

    // console.log("Success!", response.data.code);
  }, [rooms.length]);

  const fetchRooms = async () => {
    if (user) {
      try {
        // let data = await supabase.from("Room").select("*");
        const response = await axios.get("https://ludo-server-teal.vercel.app/", {
          headers: {
            "Cache-Control": "no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        console.log("fetching rooms", response.data['message']);
        // if (response.data.roomArray.length >= 1) {
        setRooms(response.data['message']);
      } catch (error) {
        console.log("Failed to retrieve rooms");
      }
    }
  };

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
            console.log("setting user", rooms);
            let roomdata = await axios.post("/api/createRoom", data);
            if (roomdata.length !== rooms.length) {
              setRooms(roomdata);
            } else {
              setRooms([]);
              fetchRooms();
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

  const removeRoom = async (index, roomid) => {
    if (user && roomid) {
      try {
        // const updatedRooms = [...rooms];
        const data = {
          userId: user.id,
          roomId: roomid,
        };

        const response = await axios.post("/api/deleteRoom", data);
        if (response) {
          setRooms([]);
          fetchRooms();
        }
        // console.log(response);
        // updatedRooms.splice(index, 1);
        // setRooms(updatedRooms);
      } catch (error) {
        console.log("Error while deleting the room");
      }
    }
  };

  const playbuttonclicked = (roomid, userid) => {
    const assignuser = async (roomid, userid) => {
      const roomId = {
        id: roomid,
      };
      let supabaseData = await axios.post("/api/fetchRoomsById", roomId);
      // let supabaseData = await fetchRoomsById(roomid);
      console.log("supabase data", supabaseData.data);
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
          console.log("User updated with room");
          let data = {
            roomid,
            userid,
          };
          let assignedUser = await axios.post("/api/assignedUser", data);
          console.log("assigned user", assignedUser.data);
          // await assignroomid_user(roomid, userid);
        }
      } catch (error) {
        console.error("Error creating Room in Supabase:", error);
      }
    };

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
        <button onClick={fetchRooms}>test</button>
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
                  {/* <Link href={`#`}> */}
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
