import { createClient } from "@supabase/supabase-js";
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
    // console.log(data);
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

export async function fetchRoomValueById(roomid) {
  // console.log('FetchRoomValue', roomid)
  try {
    let data = await supabase
      .from("Room")
      .select("value")
      .eq("id", roomid);
    // console.log(data);
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

export async function RoomCode(id, RoomCode, owner, user) {
  // console.log(owner, user)
  try {
    // console.log(id)
    const check = await supabase
      .from("Room")
      .select("*")
      .eq("id", id)
    // console.log(check)
    if (check.data[0].roomcode !== null || owner !== user) {
      return check.data[0]
    }
    const data = await supabase
      .from("Room")
      .update([{ roomcode: RoomCode }])
      .eq("id", id)
      .select('*')
    console.log(id,user,owner)
    const history = await supabase
      .from("RoomHistory")
      .update([{ roomcode: RoomCode }])
      .eq("owner_name", user)
      .select('*')
    console.log('History is history',history)
    // console.log('Room code is ', data);

    return data.data[0];
  } catch (error) {
    console.error("Error getting user id by name in Supabase:");
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

    // console.log("Delete the room ", data)
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
    // console.log(roomid);
    const { data, error } = await supabase
      .from("User")
      .select("name")
      .eq("roomid", roomid);
    // console.log(data);
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
    // console.log(data);
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
export async function fetchFile(userid, folder) {
  // console.log('alsdkf',process.env.SUP_SECRET_KEY)
  // console.log(userid)
  // let {data,error} = await supabase
  // .from("Transaction")
  // .insert([{ user_id: userid, folder:'result',roomcode:roomcode}])
  console.log(userid, folder)
  const { data, error } = await supabase
    .storage
    .from('Images')
    .list(folder, {
      limit: 1,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
      eq: 'owner_id',
      filterValue: userid
    })
  // .order('created_at',{ascending:true})
  // .eq("owner_id",userid);
  // console.log(data)
  if (error) {
    return []
    // return 0
  } else {
    return data
    // return 1;
  }
}
export async function uploadFile(userid, roomcode, amount, folder) {
  // console.log('alsdkf',process.env.SUP_SECRET_KEY)
  // console.log(userid)
  console.log('uploading file', roomcode, amount, folder)
  let data2 = null;
  if (folder === "Withdraw" || folder==="Deposit") {
    data2 = await checkFile(userid, '', folder)
  }
  else {
    data2 = await checkFile(userid, roomcode, folder)
  }
  if (data2 === 0) {
    let { data, error } = await supabase
      .from("Transaction")
      .insert([{ userid: userid, folder: folder, roomcode: roomcode, amount: amount }])
    if (error) {
      return error.message;
    }
    return 0;
  }
  return 1
}
export async function checkFile(userid, roomcode, folder) {
  // console.log('alsdkf',process.env.SUP_SECRET_KEY)
  // console.log(userid)
  console.log('checking file',userid,roomcode,folder)
  let data2 = null;
  if (folder === "result") {
    let data = await supabase
      .from("Room")
      .select()
      .eq('roomcode', roomcode)
    if(data.data.length===0){
      return 1
    }
    data2 = await supabase
      .from("Transaction")
      .select()
      .eq('userid', userid)
      .eq('roomcode', roomcode)
  }
  else if (folder === "Withdraw" || folder==="Deposit") {

    data2 = await supabase
      .from("Transaction")
      .select()
      .eq('userid', userid)
      .eq('folder', folder)
      .order('created_at', { ascending: false })
      .limit(1)



  }
  if (data2.data.length !== 0) {
    if (folder === "Withdraw" || folder==="Deposit") {
      const givenUtcTimestamp = new Date(data2.data[0]['created_at']);

      // Get the current system time in UTC
      const currentUtcTime = new Date();

      // Calculate the difference in milliseconds between the given timestamp and the current time
      const timeDifference = currentUtcTime - givenUtcTimestamp;

      // Check if the time difference is greater than 1 hour (in milliseconds)
      const oneHourInMillis = 1000; // 1 hour in milliseconds

      if (timeDifference > oneHourInMillis) {
        console.log("greater than 2")
        return 0
      } else {
        console.log('less than 2 ')
        return 1
      }
    }
    return 1
  }
  return 0;
}
