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
    console.log(check);
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
    console.log(data);
    return "Room created";
  } catch (error) {
    throw error;
  }
}

export async function checkUserInSupabase(userId) {
  try {
    // let { data: User, error } = await supabase.from("User").select("name");
    const { data, error } = await supabase
      .from("User")
      .select("*")
      .eq("user_id", userId)
      .select();
    console.log(data);
    // if (error) {
    //   throw error;
    // }
    return data.length;
  } catch (error) {
    console.error("Error creating room in Supabase:");
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
export async function deleteroom(userid) {
  try {
    const { data, error } = await supabase
      .from("Room")
      .delete()
      .eq("owned_by", userid);

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error Deleting room in Supabase");
    throw error;
  }
}
