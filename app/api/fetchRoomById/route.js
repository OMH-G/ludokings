import { NextRequest, NextResponse } from "next/server";
import { fetchUserbyRoomID } from "@/supabaseClient";

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    console.log(reqBody);
    const { id } = reqBody;

    let users;
    if (id) {
      users = await fetchUserbyRoomID(id);
      console.log("players in room", users);
    }
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "An error occurred at fetchUserbyRoomID server: " + error.message,
      },
      { status: 500 }
    );
  }
}
