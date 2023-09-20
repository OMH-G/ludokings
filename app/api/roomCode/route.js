import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export async function GET() {
  try {
    return NextResponse.json({
      code: "123456",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// export async function fetchRoomById(roomId) {
//   try {
//     const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
//     const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
//     const tableName2='User';
//     const apiUrl = `${supabaseUrl}/rest/v1/${tableName2}?select=user_id&roomid=eq.${roomId}`;

//     const response = await axios.get(apiUrl, {
//       headers: {
//         'apikey': supabaseKey,
//       },
//     });

//     if (response.status === 200) {
//       return response.data
//     } else {
//       console.error('Error fetching data:', response.statusText);
//       return null;
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return null;
//   }
// }
