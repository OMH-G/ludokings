"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Chip from "@mui/material/Chip";
import { updateChips, getChips } from "@/supabaseClient";
import { useUser, useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

export default function DepositChipsButton() {
  const [open, setOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null); // New state to hold selected file
  const [inputValue, setInputValue] = useState('');

  const { user } = useUser();
  const { getToken } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChipClick = (amount) => {
    setSelectedAmount(amount);
  };

  const depositChipsToWallet = async () => {
    const token = await getToken({ template: "supabase" });
    if (localStorage.getItem("token") !== token) {
      localStorage.setItem("token", token);
    }
    try {
      if (selectedFile) {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          {
            global: {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          }
        );
        const response = await axios.post("/api/checkResultFile", {
          token: localStorage.getItem("token"),
          roomcode: '',
          subject: "Deposit",
        });
        if (response.data === 0) {
          const { data, error } = await supabase.storage
            .from("Images")
            .upload(`payment/${user.username}/${Date.now()}`, selectedFile, {
              contentType: selectedFile.type,
            });
          console.log(data)
          if (error) {
            console.error("Error uploading file:", error);
            // return 0
          } else {
            console.log("File uploaded successfully:", data);
            let message = {
              token: localStorage.getItem("token"),
              email: "omkarhalgi50@gmail.com",
              subject: "Deposit",
              amount:inputValue
            };
            const response = await axios.post("/api/sendMail", message);
            setOpen(false)
          }
        }
        else{
          setOpen(false)
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Update state with selected file
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        className="bg-blue-600 text-white p-3 text-lg w-64 md:w-96 hover:bg-blue-500 rounded-md mb-2"
      >
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Chips</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add the chips, please choose the amount you want.
          </DialogContentText>
          {/* <div className="flex flex-row justify-center gap-2 items-center my-4">
            <Chip
              label="500"
              onClick={() => handleChipClick(500)}
              color={selectedAmount === 500 ? "primary" : "default"}
            />
            <Chip
              label="1000"
              onClick={() => handleChipClick(1000)}
              color={selectedAmount === 1000 ? "primary" : "default"}
            />
            <Chip
              label="1500"
              onClick={() => handleChipClick(1500)}
              color={selectedAmount === 1500 ? "primary" : "default"}
            />
            <Chip
              label="2000"
              onClick={() => handleChipClick(2000)}
              color={selectedAmount === 2000 ? "primary" : "default"}
            />
          </div> */}
          <input
            type="number"
            placeholder="Custom Amount"
            value={inputValue}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 mb-2"
          />
          <input type="file" onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={depositChipsToWallet}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
