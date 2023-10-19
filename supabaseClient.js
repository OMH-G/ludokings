import { createClient } from "@supabase/supabase-js";
import { supabaseAuth } from "./supauth";
// Initialize the Supabase client with your Supabase URL and API key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    global: {
      headers: {
        Authorization: `Bearer ${process.env.SUP_SECRET_KEY}`,
      },
    },
  }
);

export async function createUserInSupabase(userId, userName) {
  try {
    let check = await supabase
      .from("User")
      .select("user_id")
      .eq("user_id", userId);

    if (check.data.length !== 0) {
      return "user already exist";
    }

    const { data, error } = await supabase
      .from("User")
      .insert([{ user_id: userId, chips: 100, name: userName }])
      .select();
    console.log(data);
    return "User created";
  } catch (error) {
    throw error;
  }
}
export async function createRoomInSupabase(userId, roomname, value, userName) {
  try {
    let check = await supabase
      .from("Room")
      .select("owned_by")
      .eq("owned_by", userId);
    if (check.data.length !== 0) {
      return [];
    }

    const roomHistory = await supabase
      .from("RoomHistory")
      .insert([
        {
          owned_by: userId,
          name: roomname,
          value: value,
          owner_name: userName,
        },
      ])
      .select();

    const data = await supabase
      .from("Room")
      .insert([
        {
          owned_by: userId,
          name: roomname,
          value: value,
          owner_name: userName,
        },
      ])
      .select("id");
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchRooms() {
  try {
    let data = await supabase.from("Room").select("*");
    // console.log("Fetching room from supabase", data);
    return data;
  } catch (error) {
    console.error("Error while fetching room ");
    throw error;
  }
}
export async function fetchRoomsById(roomid) {
  try {
    let data = await supabase.from("Room").select("*").eq("id", roomid);
    return data;
  } catch (error) {
    console.error("fetching room from Supabase:");
  }
}

export async function fetchRoomValueById( roomid) {
  console.log('FetchRoomValue',roomid)
  try {
    let data = await supabase
      .from("Room")
      .select("value")
      .eq("id", roomid);
    console.log(data);
    return data;
  } catch (error) {
    console.error("fetching room from Supabase:");
  }
}

export async function getChips(userId) {
  try {
    const { data, error } = await supabase
      .from("User")
      .select("chips")
      .eq("user_id", userId)
      .select();
    // console.log(data);

    return data[0].chips;
  } catch (error) {
    console.error("Error creating room in Supabase:");
    throw error;
  }
}

export async function getUserIdByName(name) {
  try {
    const { data, error } = await supabase
      .from("User")
      .select("user_id")
      .eq("name", name)
    // console.log(data);

    return data[0];
  } catch (error) {
    console.error("Error getting user id by name in Supabase:");
    throw error;
  }
}

export async function RoomCode(id,RoomCode,owner,user){
  console.log(owner,user)
  try {
    console.log(id)
    const check = await supabase
      .from("Room")
      .select("*")
      .eq("id", id)
    console.log(check)
    if(check.data[0].roomcode!==null || owner!==user){
      return check.data[0]
    }
    const data = await supabase
      .from("Room")
      .update([{ roomcode:RoomCode }])
      .eq("id", id)
      .select('*')
    console.log('Room code is ',data);

    return data.data[0];
  } catch (error) {
    console.error("Error getting user id by name in Supabase:");
    throw error;
  }
}

export async function updateChips(userId, amount) {
  try {
    const { data, error } = await supabase
      .from("User")
      .update({ chips: amount })
      .eq("user_id", userId)
      .select();

    return "chips updated";
  } catch (error) {
    console.error("Error updating chips in Supabase:");
    throw error;
  }
}

export async function assignroomid_user(roomid, userid) {
  try {
    const { data, error } = await supabase
      .from("User")
      .update({ roomid: roomid })
      .eq("user_id", userid)
      .select();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error creating room in Supabase:");
    throw error;
  }
}
export async function deassignroomid_user(userid) {
  try {
    const { data, error } = await supabase
      .from("User")
      .update({ roomid: null })
      .eq("user_id", userid)
      .select();

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error creating room id in Supabase");
    throw error;
  }
}
export async function deleteroom(userid, roomid) {
  try {
    const { data, error } = await supabase
      .from("Room")
      .delete()
      .eq("owned_by", userid)
      .eq("id", roomid);

    console.log("Delete the room ",data)
    return data;
  } catch (error) {
    console.error("Error Deleting room in Supabase");
    throw error;
  }
}
export async function fetchroomidbyuserid(userid) {
  try {
    const { data, error } = await supabase
      .from("User")
      .select("roomid")
      .eq("user_id", userid);
    if (error) {
      throw error;
    }
    return data[0].roomid;
  } catch (error) {
    console.error("Error fetching room in Supabase");
    throw error;
  }
}

export async function fetchroomvaluebyuserid(userid) {
  try {
    const { data, error } = await supabase
      .from("Room")
      .select("value")
      .eq("owned_by", userid);

    if (error) {
      throw error;
    }
    return data[0];
  } catch (error) {
    console.error("Error fetching room in Supabase");
    throw error;
  }
}
export async function fetchroomowner(roomid) {
  try {
    const { data, error } = await supabase
      .from("Room")
      .select("owner_name")
      .eq("id", roomid);
    // console.log(data[0].owner_name);
    return data[0].owner_name;
  } catch (error) {
    console.error("Error Fetching room owner name from Supabase");
    throw error;
  }
}
export async function fetchUserbyRoomID(roomid) {
  try {
    console.log(roomid);
    const { data, error } = await supabase
      .from("User")
      .select("name")
      .eq("roomid", roomid);
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching room in Supabase");
    // throw error;
  }
}
export async function fetchRoomIdbyUser(userid) {
  try {
    const { data, error } = await supabase
      .from("User")
      .select("roomid")
      .eq("user_id", userid);
    if (error) {
      throw error;
    }
    console.log(data);
    return data[0].roomid;
  } catch (error) {
    console.error("Error fetching room in Supabase");
    throw error;
  }
}

export async function gamesPlayed(userid) {
  try {
    const { data, error } = await supabase
      .from("RoomHistory")
      .select()
      .eq("owned_by", userid);
    // .count();
    // The count is returned as data[0].count
    return data.length;
  } catch (error) {
    console.error("Error fetching games played in Supabase");
    throw error;
  }
}

export async function winChips(userid) {
  try {
    let data = await supabase
      .from("User")
      .select("win_amount")
      .eq("user_id", userid);

    return data.data[0];
  } catch (error) {
    console.error("Error fetching winChips in Supabase");
  }
}

export async function loseChips(userid) {
  try {
    let data = await supabase
      .from("User")
      .select("lose_amount")
      .eq("user_id", userid);

    return data.data[0];
  } catch (error) {
    console.error("Error fetching loseChips in Supabase");
  }
}
