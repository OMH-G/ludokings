import { NextRequest, NextResponse } from "next/server";
import { checkFile, fetchFile, uploadFile } from "@/supabaseClient";
const jwt = require("jsonwebtoken");
export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const {token,roomcode,subject}=reqBody;
    

    let decode = jwt.verify(token, process.env.SUPABASE_SECRET_KEY, {
      algorithms: ["HS256"],
    });
    let data=await checkFile(decode['username'],roomcode,subject);
    console.log(data);
    // let temp=0;
    // if(data!==0){
    //     temp=1;
    // }
    
    return NextResponse.json(data);
    // }
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "An error occurred at fetchUserbyRoomID server: " + error.message,
      },
      { status: 500 }
    );
  }
}
