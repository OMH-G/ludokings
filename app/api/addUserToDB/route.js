import { NextRequest, NextResponse } from "next/server";
import { checkUserInSupabase, createUserInSupabase } from "@/supabaseClient";

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { userId, username } = reqBody;

    const isUserInSupabase = await checkUserInSupabase(userId);
    // console.log(isUserInSupabase);

    if (isUserInSupabase) {
      return NextResponse.json("user already exists");
    }
    const adduser = await createUserInSupabase(userId, username);

    return NextResponse.json("user added successfully");
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at addMoney server: " + error.message },
      { status: 500 }
    );
  }
}
