import { NextRequest, NextResponse } from "next/server";
import { fetchRoomsById } from "@/supabaseClient";

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { roomId } = reqBody;

    let response = await fetchRoomsById(roomId);

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
