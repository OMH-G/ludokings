import { NextRequest, NextResponse } from "next/server";
import { createRoomInSupabase, getChips } from "@/supabaseClient";

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { userId, newRoomName, newValue, userName } = reqBody;

    // Use a regex pattern to validate that newValue is a positive integer
    const positiveIntegerPattern = /^[1-9]\d*$/;
    if (!positiveIntegerPattern.test(newValue)) {
      return NextResponse.json("New value must be a positive integer.");
    }

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
    return NextResponse.json("Room created", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at createRoom server: " + error.message },
      { status: 500 }
    );
  }
}
