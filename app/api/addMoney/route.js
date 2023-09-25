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

    const userChips = await getChips(userId);
    let final = userChips + amount;
    const response = await updateChips(userId, final);

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at addMoney server: " + error.message },
      { status: 500 }
    );
  }
}
