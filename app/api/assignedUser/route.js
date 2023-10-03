import { NextRequest, NextResponse } from "next/server";
import { assignroomid_user } from "@/supabaseClient";

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { roomid, userid } = reqBody;

    const assignedUser = await assignroomid_user(roomid, userid);

    return NextResponse.json(assignedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at addMoney server: " + error.message },
      { status: 500 }
    );
  }
}
