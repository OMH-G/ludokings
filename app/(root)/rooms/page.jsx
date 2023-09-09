"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function Rooms() {
  const [rooms, setRooms] = useState([
    { name: "Pawshar_kilo", value: "1" },
    { name: "ludo_mafia", value: "2" },
  ]);
  const { isLoaded, isSignedIn, user } = useUser();
  const [newRoomName, setNewRoomName] = useState("");
  const [newValue, setNewValue] = useState("");
  const [Join, setJoin] = useState(0);
  const [choosenRoom, setChoosenRoom] = useState("");

  const addRoom = () => {
    if (newRoomName !== "") {
      const newRoom = {
        name: newRoomName,
        value: newValue,
      };

      setRooms([...rooms, newRoom]);
      setNewRoomName("");
      setNewValue("");
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
                <span className="text-red-400 font-bold">{room.name}</span> Set
                By:
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
                  <button className="bg-green-500 text-white px-2 md:px-4 py-1 md:py-2 mx-1 rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300">
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
