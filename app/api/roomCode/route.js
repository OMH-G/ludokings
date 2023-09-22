import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export async function GET() {
  try {
    const min = 100;
    const max = 99999999;

    const random8DigitNumber =
      Math.floor(Math.random() * (max - min + 1)) + min;

    const formattedNumber = String(random8DigitNumber).padStart(8, "0");

    return NextResponse.json({
      code: formattedNumber,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
