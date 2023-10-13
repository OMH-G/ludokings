import { NextRequest, NextResponse } from "next/server";
import { checkUserInSupabase, createUserInSupabase } from "@/supabaseClient";
import { useUser, useAuth } from "@clerk/nextjs";
const jwt = require("jsonwebtoken");
export async function POST(NextRequest) {
  // console.log("reqBody");
  try {
    let body = await NextRequest.json();
    // reqBody = JSON.parse(reqBody);
    let decode = jwt.verify(body, process.env.SUPABASE_SECRET_KEY, {
      algorithms: ["HS256"],
    });
    // const { userid, username } = body;
    console.log(decode);
    // const isUserInSupabase = await checkUserInSupabase(userId);
    // console.log(isUserInSupabase);

    if (isUserInSupabase) {
      return NextResponse.json("user already exists");
    }
    const adduser = await createUserInSupabase(
      body,
      decode["userid"],
      decode["username"]
    );

    // console.log("----------------------------------", body);

    return NextResponse.json(NextRequest);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at addMoney server: " + error.message },
      { status: 500 }
    );
  }
}
