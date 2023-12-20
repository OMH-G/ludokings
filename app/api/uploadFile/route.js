import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/supabaseClient";
const jwt = require("jsonwebtoken");

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    // console.log(re)
    let {token,image}=reqBody;
    const decodedImage = Buffer.from(image.split(',')[1], 'base64');
    let decode = jwt.verify(token, process.env.SUPABASE_SECRET_KEY, {
      algorithms: ["HS256"],
    });
    let data=await uploadFile(decodedImage)
    
    // for (var pair of formData.entries()) {
    //     console.log(pair[0] + ": " + pair[1]);
    //   }
    // console.log(reqBody)
    // console.log(reqBody)
    // const { token } = reqBody;

    // console.log(token)
    // let res=await uploadFile(payload);

    return NextResponse.json(0);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at addMoney server: " + error.message },
      { status: 500 }
    );
  }
}
