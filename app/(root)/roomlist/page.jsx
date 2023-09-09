"use client";
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import Room from '../Room/[room]/page'
import Link from 'next/link'; // Material-UI Link component


const StyledContainer = styled('div')({
  maxWidth: '400px',
  margin: '0 auto',
  padding: '16px',
  background: '#f4f4f4', // Background color
  borderRadius: '8px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease', // Background color transition
  '&:hover': {
    background: '#e0e0e0', // Hover background color
  },
});

const StyledHeading = styled('h2')({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '20px',
});

const StyledInputContainer = styled('div')({
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
});

const StyledAddButton = styled(Button)({
  flex: 'none',
  marginLeft: '8px',
  '&:hover': {
    backgroundColor: '#1976D2', // Hover color for the button
  },
});

const StyledRemoveButton = styled(Button)({
  flex: 'none',
  marginLeft: 'auto',
  width:'fit-content',
  backgroundColor: '#f44336', // Background color for the button
  '&:hover': {
    backgroundColor: '#d32f2f', // Hover color for the button
  },
  marginTop:'2px',
  marginRight:'auto',
  display:'block'
  
});

export default function RoomList(){
  const [rooms, setRooms] = useState([{name: 'temp1', value: '1'},{name: 'temp2', value: '2'}]);
  const [newRoomName, setNewRoomName] = useState('');
  const [newValue, setNewValue] = useState('');
  const [Join, setJoin] = useState(0);
  const [choosenRoom,setChoosenRoom]=useState('')

  const addRoom = () => {
    if (newRoomName !== '') {
      const newRoom = {
        name: newRoomName,
        value: newValue,
      };

      setRooms([...rooms, newRoom]);
      setNewRoomName('');
      setNewValue('');
    }
  };
  const join = (roomname) => {
    console.log('Join clicked')
    setJoin(1);
    setChoosenRoom(roomname)
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
    
    <StyledContainer>
      
      <StyledHeading>Room Manager</StyledHeading>
      <StyledInputContainer>
        <TextField
          label="Room Name"
          variant="outlined"
          fullWidth
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />
      </StyledInputContainer>
      <StyledInputContainer>
        <TextField
          label="Chips"
          variant="outlined"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          style={{ flex: '1', marginRight: '8px' }}
        />
        <StyledAddButton
          variant="contained"
          color="primary"
          onClick={addRoom}
        >
          Add
        </StyledAddButton>
      </StyledInputContainer>
      <ul>
        {rooms.map((room, index) => (
          <li key={index} className={StyledInputContainer}>
            <span style={{ fontWeight: 'bold' }}>{room.name}:</span>
            <TextField
              type="number"
              variant="outlined"
              value={room.value}
              onChange={(e) => updateRoomValue(index, e.target.value)}
              style={{ flex: '1', marginLeft: '8px' }}
            />
            
        <Link href={`/Room/${room.name}` }>
        <button className="bg-green-500 text-white px-4 py-2 mx-1 rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300">
          Join
        </button>
      </Link>
            <StyledRemoveButton
              variant="contained"
              color="error"
              onClick={() => removeRoom(index)}
              startIcon={<DeleteIcon />}
              className="p-1 w-5 h-8 m-10"
            >
            </StyledRemoveButton>
          </li>
        ))}
      </ul>
    </StyledContainer>
    
  );
};

