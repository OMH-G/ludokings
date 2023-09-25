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

export default function WithdrawChipsButton() {
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

  const withdrawChipsFromWallet = async () => {
    try {
      if (user) {
        const chips = await getChips(user.id);

        if (selectedAmount <= chips) {
          let amount = chips - selectedAmount;
          await updateChips(user.id, amount);
          //   console.log("Withdrawal amount: ", selectedAmount);
          alert(`Successfully withdrawn ₹${selectedAmount}.`);
          setOpen(false);
        } else {
          alert("You don't have sufficient chips.");
        }
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
