import { NextRequest, NextResponse } from "next/server";
import { fetchRooms } from "@/supabaseClient";

export async function GET() {
  try {
    // if(NextRequest.)

    const roomArray = await fetchRooms();

    //  res.setHeader("Cache-Control", "no-store, max-age=0");
    return NextResponse.json({ roomArray }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at fetchRooms server: " + error.message },
      { status: 500 }
    );
  }
}
