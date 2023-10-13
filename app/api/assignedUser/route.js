import { NextRequest, NextResponse } from "next/server";
import { assignroomid_user } from "@/supabaseClient";
const jwt = require("jsonwebtoken");

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { roomid, token } = reqBody;

    let decode = jwt.verify(token, process.env.SUPABASE_SECRET_KEY, {
      algorithms: ["HS256"],
    });

    let userId = decode["userid"];

    const assignedUser = await assignroomid_user(token, roomid, userId);

    return NextResponse.json(assignedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at addMoney server: " + error.message },
      { status: 500 }
    );
  }
}
