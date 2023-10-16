import { NextRequest, NextResponse } from "next/server";
import { fetchRoomValueById, fetchroomidbyuserid } from "@/supabaseClient";
const jwt = require("jsonwebtoken");

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { id, token } = reqBody;

    let decode = jwt.verify(token, process.env.SUPABASE_SECRET_KEY, {
      algorithms: ["HS256"],
    });

    let userId = decode["userid"];

    const roomId = await fetchroomidbyuserid(userId);
    const roomValue = await fetchRoomValueById(token, roomId);

    // console.log(
    //   "room............................................",
    //   roomValue.data[0].value
    // );

    return NextResponse.json(roomValue.data[0].value);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at addMoney server: " + error.message },
      { status: 500 }
    );
  }
}
