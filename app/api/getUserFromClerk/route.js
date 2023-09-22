import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { userId } = reqBody;
    const apikey = process.env.CLERK_SECRET_KEY;
    // const userId = user_2VeZDRvMP3Lw2eleP6OjynhSAff;
    const headers = {
      Authorization: `Bearer ${apikey}`,
    };

    const response = await axios.get(
      `https://api.clerk.dev/v1/users/${userId}`,
      {
        headers,
      }
    );

    return NextResponse.json({
      code: response,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
