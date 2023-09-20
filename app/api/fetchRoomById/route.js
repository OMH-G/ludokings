// import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";

// export async function POST(NextRequest) {
//   try {
//     const reqBody = await NextRequest.json();
//     const { roomID } = reqBody;
//     const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
//     const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
//     const tableName2 = "User";
//     const apiUrl = `${supabaseUrl}/rest/v1/${tableName2}?select=user_id&roomid=eq.${roomID}`;

//     const response = await axios.get(apiUrl, {
//       headers: {
//         apikey: supabaseKey,
//       },
//     });

//     if (response.status === 200) {
//       //   return response.data;

//       return NextResponse.json({
//         data: response,
//       });
//     }

//     // return NextResponse.json({
//     //   message: roomID,
//     // });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return null;
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { roomID } = reqBody;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const tableName2 = "User";
    const apiUrl = `${supabaseUrl}/rest/v1/${tableName2}?select=user_id&roomid=eq.${10}`;

    const response = await axios.get(apiUrl, {
      headers: {
        apikey: supabaseKey,
      },
    });

    if (response.status === 200) {
      return NextResponse.json(response.data);
    } else {
      console.error("Error fetching data:", response.statusText);
      return NextResponse.json(
        { error: response.statusText },
        { status: response.status }
      );
    }

    // return NextResponse.json({
    //   data: "roomID",
    // });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
