import { NextRequest, NextResponse } from "next/server";
import { getChips, updateChips, getUserIdByName } from "@/supabaseClient";

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { amount, name1, name2 } = reqBody;

    const getUserId1 = await getUserIdByName(name1);
    // console.log(getUserId1.user_id);

    let response1;
    const userChips1 = await getChips(getUserId1.user_id);
    if (amount <= userChips1) {
      let final1 = userChips1 - amount;
      response1 = await updateChips(getUserId1.user_id, final1);
    }

    const getUserId2 = await getUserIdByName(name2);
    // console.log(getUserId2.user_id);

    let response2;
    const userChips2 = await getChips(getUserId2.user_id);
    if (amount <= userChips2) {
      let final2 = userChips2 - amount;
      response2 = await updateChips(getUserId2.user_id, final2);
    }
    return NextResponse.json(response2);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred at withdrawMoney server: " + error.message },
      { status: 500 }
    );
  }
}
