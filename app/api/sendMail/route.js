import { NextRequest, NextResponse } from "next/server";
import { fetchFile,uploadFile } from "@/supabaseClient";
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'omkarhalgi90@gmail.com',
      pass: 'gelc gydb eizp hhha'
    }
  });
export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const {token,subject}=reqBody;
    let roomCode='';
    let necc_fields=null;
    let decode = jwt.verify(token, process.env.SUPABASE_SECRET_KEY, {
      algorithms: ["HS256"],
    });
    // console.log(decode)
    let folder="payment";
    if(subject=="Result"){
      let {roomcode}=reqBody;
      roomCode=roomcode;
      folder='result'
      await uploadFile(decode['username'],roomcode)
    }
    else if(subject=="Withdraw"){
      let {amount}=reqBody;
      necc_fields={
        username:decode['username'],
        userid:decode['userid'],
        amount:amount,
      }
    }
    else{
    let data=await fetchFile(decode['userid'],folder+'/'+roomCode);
    console.log(data,folder)
    necc_fields={
      username:decode['username'],
      userid:decode['userid'],
      filename:data[0]['name'],
      created_at:data[0]['created_at'],
      type:data[0]['metadata']['mimetype'],
    }
    if(subject=="Result"){
      necc_fields['roomcode']=roomCode;
    }
  }
      const mailOptions = {
       
        from: 'omkarhalgi50@gmail.com',
        to: 'omkarhalgi90@gmail.com',
        subject:subject,
        text: JSON.stringify(necc_fields)
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);

    return NextResponse.json({status:200,message:"File uploaded Successfully"});
  } catch (error) {
    return NextResponse.json(
      { error: "Error sending email " + error.message },
      { status: 500 }
    );
  }
}