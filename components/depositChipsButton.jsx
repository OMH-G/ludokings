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
import { useUser } from "@clerk/nextjs";
import axios from "axios";

export default function DepositChipsButton() {
  const [open, setOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const { user } = useUser();

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
    try {
      if (user) {
        // const chips = await getChips(user.id);
        const userData = {
          userId: user.id,
          amount: selectedAmount,
        };
        const response = await axios.post("/api/addMoney", userData);
        console.log(response.data);

        alert(`Successfully added ₹${selectedAmount}.`);
        setOpen(false);
      }
    } catch (error) {
      console.log("Error while adding the chips.");
    }
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
          <Button onClick={depositChipsToWallet}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
