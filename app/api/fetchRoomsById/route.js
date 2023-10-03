import { NextRequest, NextResponse } from "next/server";
import { fetchRoomsById } from "@/supabaseClient";

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { id } = reqBody;

    const response = await fetchRoomsById(id);

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at addMoney server: " + error.message },
      { status: 500 }
    );
  }
}
