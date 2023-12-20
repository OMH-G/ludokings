import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/supabaseClient";
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const {token,roomcode}=reqBody;
    let decode = jwt.verify(token, process.env.SUPABASE_SECRET_KEY, {
      algorithms: ["HS256"],
    });
    // console.log(decode)
   let data=await uploadFile(decode['username'],roomcode)
    console.log("Transaction ",data)
    return NextResponse.json({status:200,message:data});
  } catch (error) {
    return NextResponse.json(
      { error: "Error sending email " + error.message },
      { status: 500 }
    );
  }
}
