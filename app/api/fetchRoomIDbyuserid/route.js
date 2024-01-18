import { NextRequest, NextResponse } from "next/server";
import {  fetchroomidbyuserid } from "@/supabaseClient";
const jwt = require("jsonwebtoken");

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { token } = reqBody;
    // const new_token=token;
    let decode = jwt.verify(token, process.env.SUPABASE_SECRET_KEY, {
      algorithms: ["HS256"],
    });
    console.log(decode['userid'])
    const roomId = await fetchroomidbyuserid(decode['userid']);
    console.log(roomId)
    

    
    // console.log(
    //   "room............................................",
      // roomValue.data[0].value
    // );

    return NextResponse.json(roomId);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at addMoney server: " + error.message },
      { status: 500 }
    );
  }
}
