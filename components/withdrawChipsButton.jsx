"use client";
import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function WithdrawChipsButton() {
  const [open, setOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);
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
  
  // useEffect(() => {
  //   supabase
  //     .channel("custom-new-channel")
  //     .on(
  //       "postgres_changes",
  //       { event: "*", schema: "public", table: "User" },
  //       (payload) => {
  //         console.log("user changes");
  //       }
  //     )
  //     .subscribe();
  // });

  const withdrawChipsFromWallet = async () => {
    try {
      if (user) {
        // const chips = await getChips(user.id);
        const response = await axios.post("/api/checkResultFile", {
          token: localStorage.getItem("token"),
          roomcode: '',
          subject: 'Withdraw'
        });
        if (response.data === 0) {
        const token = await getToken({ template: "supabase" });
        const userData = {
          token: token,
          subject:"Withdraw",
          amount: inputValue
        };
        const response = await axios.post("/api/sendMail", userData);
        if (response) {
          console.log(response.data);
        }

        alert(`Successfully withdrawed ₹${inputValue}.`);
        setOpen(false);
      }
      else{
        setOpen(false);
      }
    }
    } catch (error) {
      console.log("Error while withdrawing the chips.");
    }
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
        Withdraw
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Withdraw Chips</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To withdraw the chips, please choose the amount you want.
          </DialogContentText>
          <input
            type="number"
            placeholder="Custom Amount"
            value={inputValue}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 mb-2"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <Button onClick={withdrawChipsFromWallet}>Withdraw</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
