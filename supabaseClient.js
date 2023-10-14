import { createClient } from "@supabase/supabase-js";
import { supabaseAuth } from "./supauth";
// Initialize the Supabase client with your Supabase URL and API key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Function to create a user in Supabase
export async function createUserInSupabase(auth, userId, userName) {
  try {
    // Define the user data to be inserted or updated in the "User" table

    // Insert or update the user data in the "User" table using upsert

    let check = await supabaseAuth(auth)
      .from("User")
      .select("user_id")
      .eq("user_id", userId);

    if (check.data.length !== 0) {
      return "user already exist";
    }

    const { data, error } = await supabaseAuth(auth)
      .from("User")
      .insert([{ user_id: userId, chips: 100, name: userName }])
      .select();
    console.log(data);
    return "User created";
  } catch (error) {
    throw error;
  }
}
export async function createRoomInSupabase(
  auth,
  userId,
  roomname,
  value,
  userName
) {
  try {
    let check = await supabaseAuth(auth)
      .from("Room")
      .select("owned_by")
      .eq("owned_by", userId);
    if (check.data.length !== 0) {
      return "room created";
    }
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
      .select();
    return "Room created";
  } catch (error) {
    throw error;
  }
}

export async function checkUserInSupabase(userId) {
  try {
    const { data, error } = await supabase
      .from("User")
      .select("*")
      .eq("user_id", userId)
      .select();
    console.log(data);

    return data.length;
  } catch (error) {
    console.error("Error creating room in Supabase:");
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

export async function getChips(auth, userId) {
  try {
    const { data, error } = await supabaseAuth(auth)
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
      .select();
    // console.log(data);

    return data[0];
  } catch (error) {
    console.error("Error getting user id by name in Supabase:");
    throw error;
  }
}

export async function updateChips(auth, userId, amount) {
  try {
    const { data, error } = await supabaseAuth(auth)
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

export async function assignroomid_user(auth, roomid, userid) {
  try {
    const { data, error } = await supabaseAuth(auth)
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
export async function deassignroomid_user(auth, userid) {
  try {
    const { data, error } = await supabaseAuth(auth)
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
export async function deleteroom(auth, userid, roomid) {
  try {
    const { data, error } = await supabaseAuth(auth)
      .from("Room")
      .delete()
      .eq("owned_by", userid)
      .eq("id", roomid);

    if (error) {
      throw error;
    }
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
export async function fetchUserbyRoomID(auth, roomid) {
  try {
    console.log(roomid);
    const { data, error } = await supabaseAuth(auth)
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
