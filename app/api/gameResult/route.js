import { NextRequest, NextResponse } from "next/server";
import { updateChips, getChips, fetchRoomsById } from "@/supabaseClient";
const jwt = require("jsonwebtoken");

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { hasCongratulations, token, roomId, roomValue } = reqBody;

    let decode = jwt.verify(token, process.env.SUPABASE_SECRET_KEY, {
      algorithms: ["HS256"],
    });

    let userId = decode["userid"];

    let response;
    if (hasCongratulations == true) {
      const userChips = await getChips(token, userId);
      let final = userChips + roomValue * 1.95;
      const res = await updateChips(token, userId, final);
      response = res;
    } else {
      const userChips = await getChips(token, userId);
      // let final = userChips - roomValue;
      // const res = await updateChips(userId, final);
      response = "You Lose";
    }

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "An error occurred at fetchRoomOwnerById server: " + error.message,
      },
      { status: 500 }
    );
  }
}
