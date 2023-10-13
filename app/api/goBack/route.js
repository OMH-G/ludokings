import { NextRequest, NextResponse } from "next/server";
import { deassignroomid_user } from "@/supabaseClient";
const jwt = require("jsonwebtoken");

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { token } = reqBody;

    let decode = jwt.verify(token, process.env.SUPABASE_SECRET_KEY, {
      algorithms: ["HS256"],
    });

    let userId = decode["userid"];

    const goback = await deassignroomid_user(token, userId);

    return NextResponse.json(goback);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at addMoney server: " + error.message },
      { status: 500 }
    );
  }
}
