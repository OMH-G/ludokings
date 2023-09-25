import { NextRequest, NextResponse } from "next/server";
import { getChips, updateChips } from "@/supabaseClient";

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { userId, amount } = reqBody;
    // if (userId && amount) {
    const userChips = await getChips(userId);
    let final = userChips + amount;
    await updateChips(userId, final);

    return NextResponse.json({ chips: final }, { status: 200 });
    // }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
