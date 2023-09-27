import { NextRequest, NextResponse } from "next/server";
import { fetchRooms } from "@/supabaseClient";

export async function GET() {
  try {
    const response = await fetchRooms();

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at fetchRooms server: " + error.message },
      { status: 500 }
    );
  }
}
