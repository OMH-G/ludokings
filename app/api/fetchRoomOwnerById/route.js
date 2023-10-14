import { NextRequest, NextResponse } from "next/server";
import { fetchroomowner } from "@/supabaseClient";

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { id,token } = reqBody;

    let owner=[];
    if (id) {
      owner = await fetchroomowner(id);

      console.log("Owner of room", owner);
    }
    console.log('Owner of room',owner)
    return NextResponse.json(owner);
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
