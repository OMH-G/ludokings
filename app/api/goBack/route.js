import { NextRequest, NextResponse } from "next/server";
import { deassignroomid_user } from "@/supabaseClient";

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { id } = reqBody;

    const goback = await deassignroomid_user(id);

    return NextResponse.json(goback);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at addMoney server: " + error.message },
      { status: 500 }
    );
  }
}
