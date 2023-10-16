"use client";
import React, { useState, useContext, useEffect, useCallback, useMemo } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import axios from "axios";
import { useUser, useAuth } from "@clerk/nextjs";
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
  const { getToken } = useAuth();


  const fetchRooms = useCallback(async () => {
    if (user) {
      try {
        const response = await axios.get("https://ludo-server-teal.vercel.app/fetchroom", {
          headers: {
            "Cache-Control": "no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        console.log("fetching rooms", response.data["message"]);
        setRooms(response.data["message"]);
      } catch (error) {
        console.log("Failed to retrieve rooms");
      }
    }
  }, [user]);

  const getUserChips = useCallback(async () => {
    if (user) {
      try {
        const token = JSON.stringify(await getToken({ template: "supabase" }));
        const response = await axios.post("/api/getChips", token, {
          withCredentials: true,
        });
        console.log(response);
        setChips(response.message);
      } catch (error) {
        console.error("Error fetching user's chips: ", error);
      }
    }
  }, [user, getToken]);

  useEffect(() => {
    console.log('Location ',window.location.pathname)
    getUserChips();
  }, [getUserChips]);

  useEffect(() => {
    console.log(rooms);
    fetchRooms();
    const Room = supabase
      .channel("custom-all-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "Room" }, (payload) => {
        console.log("Change received!", payload);
        fetchRooms();
      })
      .subscribe();
  }, [rooms.length,user]);
  const addRoom = () => {
    const createRoom = async () => {
      if (user) {
        const token = await getToken({ template: "supabase" });
        try {
          const data = {
            token,
            newRoomName,
            newValue,
          };

          if (chips && newValue > chips) {
            alert("You do not have enough chips!");
          } else {
            console.log("setting user", rooms);
            let roomdata = await axios.post("/api/createRoom", data, {
              withCredentials: true,
            });
            console.log("asksldfkl",roomdata)
            if(roomdata.data.length!==0){
              setRoomID(roomdata.data[0]['id']);
              assignuser(roomdata.data[0]['id'], user.id);
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

  const join = (roomname) => {
    console.log("Join clicked");
    setJoin(1);
    setChoosenRoom(roomname);
  };

  const removeRoom = async (index, roomid) => {
    console.log(user, roomid);
    if (user && roomid) {
      const token = await getToken({ template: "supabase" });
      try {
        // const updatedRooms = [...rooms];
        const data = {
          token: token,
          roomId: roomid,
        };

        const response = await axios.post("/api/deleteRoom", data, {
          withCredentials: true,
        });
        if (response) {
          setRooms([]);
        }
        // console.log(response);
        // updatedRooms.splice(index, 1);
        // setRooms(updatedRooms);
      } catch (error) {
        console.log("Error while deleting the room");
      }
    }
  };

  const assignuser = async (roomid, userid) => {
    const token = await getToken({ template: "supabase" });
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
    } else if(supabaseData!==null){
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
  const playbuttonclicked = (roomid, userid) => {
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
        <Link href={newRoomName !== "" ? `/room/${newRoomName}` : "/room"}>
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
