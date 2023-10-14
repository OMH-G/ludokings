import { NextRequest, NextResponse } from "next/server";
import { deleteroom } from "@/supabaseClient";
const jwt = require("jsonwebtoken");

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { token, roomId } = reqBody;

    let decode = jwt.verify(token, process.env.SUPABASE_SECRET_KEY, {
      algorithms: ["HS256"],
    });

    // console.log(decode);
    let userId = decode["userid"];

    const response = deleteroom( userId, roomId);

    return NextResponse.json("Room deleted", { status: 200 });
    // return NextResponse.json({ roomArray }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at deleteRoom server: " + error.message },
      { status: 500 }
    );
  }
}
