import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with your Supabase URL and API key
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Function to create a user in Supabase
export async function createUserInSupabase(userId) {
    try {
        // Define the user data to be inserted or updated in the "User" table
        const userData = {
            user_id: userId, // The user ID you want to create
            // Add other user data fields as needed
        };

        // Insert or update the user data in the "User" table using upsert

        const { data, error } = await supabase
            .from('User')
            .insert([
                { user_id: userId, chips: 100 },
            ])
            .select()


        return data[0];
    } catch (error) {
        throw error;
    }
}
export async function createRoomInSupabase(userId, roomname, value) {
    try {
        const { data, error } = await supabase
            .from('Room')
            .insert([
                { owned_by: userId, name: roomname, value: value },
            ])
            .select()
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error('Error creating room in Supabase:');
        throw error;
    }
}

export async function assignroomid_user(roomid, userid) {
    try {
        console.log(roomid,userid)
        const { data, error } = await supabase
            .from('User')
            .update({ roomid: roomid })
            .eq('user_id', userid)
            .select()

        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error('Error creating room in Supabase:');
        throw error;
    }
}
export async function deassignroomid_user(userid) {
    try {
        const { data, error } = await supabase
            .from('User')
            .update({ roomid: null })
            .eq('user_id', userid)
            .select()

        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error('Error creating room id in Supabase');
        throw error;
    }
}

