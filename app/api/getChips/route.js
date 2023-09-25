import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getChips } from "@/supabaseClient";

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { id } = reqBody;
    if (id) {
      const userChips = await getChips(id);

      return NextResponse.json(userChips);
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
