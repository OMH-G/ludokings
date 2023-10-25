import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { RoomCode, fetchroomidbyuserid, fetchUserbyRoomID, getUserIdByName, getChips, updateChips, fetchroomowner } from '../../../supabaseClient'
import jwt from 'jsonwebtoken'
export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    // console.log(reqBody)
    const min = 100;
    const max = 99999999;

    const random8DigitNumber =
      Math.floor(Math.random() * (max - min + 1)) + min;

    const formattedNumber = String(random8DigitNumber).padStart(8, "0");

    const token = reqBody;
    // console.log(reqBody)
    let decode = jwt.verify(token, process.env.SUPABASE_SECRET_KEY, {
      algorithms: ["HS256"],
    });
    const data = await fetchroomidbyuserid(decode['userid']);
    const roomOwner = await fetchroomowner(data)
    const roomdata = await RoomCode(data, formattedNumber, roomOwner, decode['username'])
    console.log(data,roomOwner,roomdata)
    console.log('Room data', roomdata)
    if (roomOwner === decode['username']) {
      console.log('-----------------------------------------------Paisa cut-------------------------')
      const amount = roomdata['value']
      const players = await fetchUserbyRoomID(roomdata['id'])
      console.log('Players',players)
      const getUserId1 = await getUserIdByName(players[0].name);
      const getUserId2 = await getUserIdByName(players[1].name);
      // // console.log(getUserId1.user_id);

      let response1;
      let response2;
      const userChips1 = await getChips(getUserId1.user_id);
      if (amount <= userChips1) {
        let final1 = userChips1 - amount;
        await updateChips(getUserId1.user_id, final1);
      }
      const userChips2 = await getChips(getUserId2.user_id);
      if (amount <= userChips2) {
        let final2 = userChips2 - amount;
        await updateChips(getUserId2.user_id, final2);
      }
      console.log('--------------------userchips1', userChips1, userChips2)
    }
    // Delay for 5 seconds
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return NextResponse.json({
      code: roomdata.roomcode,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
