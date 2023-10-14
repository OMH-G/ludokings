import { NextRequest, NextResponse } from "next/server";
import { createRoomInSupabase, getChips } from "@/supabaseClient";
const jwt = require("jsonwebtoken");

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { token, newRoomName, newValue } = reqBody;

    let decode = jwt.verify(token, process.env.SUPABASE_SECRET_KEY, {
      algorithms: ["HS256"],
    });
    let { userid, username } = decode;
    // let userId = decode["userid"];
    // let username = decode["username"];

    // Use a regex pattern to validate that newValue is a positive integer
    const positiveIntegerPattern = /^[1-9]\d*$/;
    if (!positiveIntegerPattern.test(newValue)) {
      return NextResponse.json("New value must be a positive integer.");
    }

    const userChips = await getChips(userid);

    // if (userChips < newValue) {
    //   return NextResponse.json("You don't have sufficient balance.");
    // }
    console.log("up", userid, username);

    const response = await createRoomInSupabase(
      userid,
      newRoomName,
      newValue,
      username
    );
      console.log("Execution",response);
    console.log("down", userid, username);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at createRoom server: " + error.message },
      { status: 500 }
    );
  }
}
