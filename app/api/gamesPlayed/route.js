import { NextRequest, NextResponse } from "next/server";
import { gamesPlayed } from "@/supabaseClient";
import { json } from "stream/consumers";
const jwt = require("jsonwebtoken");

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { token } = reqBody;

    // console.log("token", );

    let decode = jwt.verify(
      JSON.parse(token),
      process.env.SUPABASE_SECRET_KEY,
      {
        algorithms: ["HS256"],
      }
    );

    let userId = decode["userid"];

    const gamesPlayedCount = await gamesPlayed( userId);

    console.log("gamesPlayed", gamesPlayedCount);

    return NextResponse.json(gamesPlayedCount);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at gamesPlayed server: " + error.message },
      { status: 500 }
    );
  }
}
