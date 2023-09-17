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
export async function createRoomInSupabase(userId, roomname) {
    try {
        let idOfUser = await supabase
            .from('User')
            .select("id")
            .eq("user_id", userId)
        
        const { data, error } = await supabase
        .from('Room')
        .insert([
            { ownedby: idOfUser.data[0].id, name: roomname },
        ])
        .select()

        return data[0];
    } catch (error) {
        console.error('Error creating user in Supabase:', error);
        throw error;
    }
}