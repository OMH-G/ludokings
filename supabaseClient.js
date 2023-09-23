import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client with your Supabase URL and API key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Function to create a user in Supabase
export async function createUserInSupabase(userId, userName) {
  try {
    // Define the user data to be inserted or updated in the "User" table

    // Insert or update the user data in the "User" table using upsert

    let check = await supabase
      .from("User")
      .select("user_id")
      .eq("user_id", userId);

    if (check.data.length !== 0) {
      throw error;
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
    // Define the user data to be inserted or updated in the "User" table

    // Insert or update the user data in the "User" table using upsert

    let check = await supabase
      .from("Room")
      .select("owned_by")
      .eq("owned_by", userId);
    if (check.data.length !== 0) {
      return null;
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

export async function getChips(userId) {
  try {
    const { data, error } = await supabase
      .from("User")
      .select("chips")
      .eq("user_id", userId)
      .select();
    console.log(data);

    return data[0].chips;
  } catch (error) {
    console.error("Error creating room in Supabase:");
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
  } catch (error) {
    console.error("Error updating chips in Supabase:");
    throw error;
  }
}

export async function assignroomid_user(roomid, userid) {
  try {
    console.log(roomid, userid);
    const { data, error } = await supabase
      .from("User")
      .update({ roomid: roomid })
      .eq("user_id", userid)
      .select();
    console.log(data);
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

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error Deleting room in Supabase");
    throw error;
  }
}
