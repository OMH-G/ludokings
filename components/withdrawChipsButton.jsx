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
        const token = await getToken({ template: "supabase" });
        const userData = {
          token: token,
          amount: selectedAmount,
        };
        const response = await axios.post("/api/withdrawMoney", userData, {
          withCredentials: true,
        });
        if (response) {
          console.log(response.data);
        }

        alert(`Successfully withdrawed ₹${selectedAmount}.`);
        setOpen(false);
      }
    } catch (error) {
      console.log("Error while withdrawing the chips.");
    }
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
          <div className="flex flex-row justify-center gap-2 items-center my-4">
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
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={withdrawChipsFromWallet}>Withdraw</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
