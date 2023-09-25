import { NextRequest, NextResponse } from "next/server";
import { getChips, updateChips } from "@/supabaseClient";

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { userId, amount } = reqBody;

    if (!userId || !amount) {
      return NextResponse.json(
        { error: "Missing userId or amount" },
        { status: 400 }
      );
    }

    let response;
    const userChips = await getChips(userId);
    if (amount <= userChips) {
      let final = userChips - amount;
      response = await updateChips(userId, final);
    }
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at withdrawMoney server: " + error.message },
      { status: 500 }
    );
  }
}
