"use client";
import { useEffect, useState } from 'react';
import { useAuth } from "@clerk/nextjs";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function Room({ params }) {
  const { userId } = useAuth();
  const router = useRouter();
  const room = params.room;

  //Temporary database which can be replace with main database with fetch or axios.
  const database = {
    'temp1': [userId, 'user2', 'user3'],
    'temp2':['user3','user4']
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the API endpoint URL
    if(!(room in database)){
      database[room]=[userId];
    }
    const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://flask-room-code.vercel.app/roomCode';

    // Fetch data from the API
    fetch(corsProxyUrl + apiUrl)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);
  function goBack(){
   router.back();
  }
  return (
    <div className="bg-blue-200 p-4">
      <button
        onClick={goBack}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Go Back
      </button>
      <div className="text-2xl font-bold mb-4">Room Details for {room}</div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Users in the room:</h3>
        {database[room]&&database[room].map((item, index) => (
          <div key={index} className="mb-1">{item}</div>
        ))}
      </div>
      <div>
        {loading ? (
          <p>Loading room code...</p>
        ) : (
          <div>
            <h3 className="text-xl font-semibold mb-2">Room Code:</h3>
            <div className="bg-white p-2 rounded-lg shadow-md">
              {data.roomcode}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
