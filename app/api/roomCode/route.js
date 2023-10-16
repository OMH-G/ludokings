import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import {RoomCode,fetchroomidbyuserid} from '../../../supabaseClient'
import jwt from 'jsonwebtoken'
export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const min = 100;
    const max = 99999999;

    const random8DigitNumber =
      Math.floor(Math.random() * (max - min + 1)) + min;

    const formattedNumber = String(random8DigitNumber).padStart(8, "0");
    
    const token = reqBody;

    let decode = jwt.verify(token, process.env.SUPABASE_SECRET_KEY, {
      algorithms: ["HS256"],
    });
    const data=await fetchroomidbyuserid(decode['userid']);
     const roomdata=await RoomCode(data,formattedNumber)
     console.log(roomdata);
    // Delay for 5 seconds
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return NextResponse.json({
      code: roomdata,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
