import { NextRequest, NextResponse } from "next/server";
import { winChips, loseChips } from "@/supabaseClient";
const jwt = require("jsonwebtoken");

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { token } = reqBody;

    // console.log("token", );

    let decode = jwt.verify(token, process.env.SUPABASE_SECRET_KEY, {
      algorithms: ["HS256"],
    });

    let userId = decode["userid"];
    // console.log("userId", userId);

    const winAmount = await winChips(userId);
    const loseAmount = await loseChips(userId);

    // console.log("win", winAmount.win_amount);
    // console.log("lose", loseAmount.lose_amount);

    const gameStats = {
      winAmount: winAmount.win_amount,
      loseAmount: loseAmount.lose_amount,
    };

    return NextResponse.json(gameStats);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at gamesPlayed server: " + error.message },
      { status: 500 }
    );
  }
}
