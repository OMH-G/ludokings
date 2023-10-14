import { NextRequest, NextResponse } from "next/server";
import { getChips } from "@/supabaseClient";
const jwt = require("jsonwebtoken");

export async function POST(NextRequest) {
  try {
    // const reqBody = await NextRequest.json();
    // const { id } = reqBody;

    let body = await NextRequest.json();

    let decode = jwt.verify(body, process.env.SUPABASE_SECRET_KEY, {
      algorithms: ["HS256"],
    });

    // console.log(decode);

    if (!decode["userid"]) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const userChips = await getChips(decode["userid"]);
    // const userChips = await getChips(id);

    return NextResponse.json(userChips);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at getChips server: " + error.message },
      { status: 500 }
    );
  }
}
