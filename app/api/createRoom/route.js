import { NextRequest, NextResponse } from "next/server";
import { createRoomInSupabase } from "@/supabaseClient";

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { userId, newRoomName, newValue, userName } = reqBody;

    const response = await createRoomInSupabase(
      userId,
      newRoomName,
      newValue,
      userName
    );

    return NextResponse.json("Room created");
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at createRoom server: " + error.message },
      { status: 500 }
    );
  }
}
