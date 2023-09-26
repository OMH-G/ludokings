import { NextRequest, NextResponse } from "next/server";
import { createRoomInSupabase, getChips } from "@/supabaseClient";

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { userId, newRoomName, newValue, userName } = reqBody;

    const userChips = await getChips(userId);

    // if (userChips < newValue) {
    //   return NextResponse.json("You don't have sufficient balance.");
    // }
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
