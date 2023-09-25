import { NextRequest, NextResponse } from "next/server";
import { getChips } from "@/supabaseClient";

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { id } = reqBody;

    if (!id) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const userChips = await getChips(id);

    return NextResponse.json(userChips);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at getChips server: " + error.message },
      { status: 500 }
    );
  }
}
