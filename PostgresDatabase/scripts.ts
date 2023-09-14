import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deleteAllUsers() {
  try {
    const deletedUsers = await prisma.user.deleteMany();
    console.log(`Deleted ${deletedUsers.count} users.`);
  } catch (error) {
    console.error('Error deleting users:', error);
  }
}
async function deleteAllRooms() {
  try {
    const deletedRooms = await prisma.room.deleteMany();
    console.log(`Deleted ${deletedRooms.count} rooms.`);
  } catch (error) {
    console.error('Error deleting rooms:', error);
  } finally {
    await prisma.$disconnect();
  }
}


// Call the function to delete all rooms



async function createUsers() {
  try {
    const user1 = await prisma.user.create({
      data: {
        userid: 'user1',
        chips: 100,
      },
    });
    
    const user2 = await prisma.user.create({
      data: {
        userid: 'user2',
        chips: 50,
      },
    });

    const user3 = await prisma.user.create({
      data: {
        userid: 'user3',
        chips: 75,
      },
    });

    console.log('Users created:', user1, user2, user3);
  } catch (error) {
    console.error('Error creating users:', error);
  }
}

// Call the function to create users

async function addUsersToRooms() {
  try {
    const room1 = await prisma.room.create({
      data: {
        name: 'Room 1',
        code: 12345,
        ownedby: 'user1', // user1 owns this room
        members: {
          connect: [{ userid: 'user1' }, { userid: 'user2' }], // user1 and user2 are members
        },
      },
    });

    const room2 = await prisma.room.create({
      data: {
        name: 'Room 2',
        code: 54321,
        ownedby: 'user2', // user2 owns this room
        members: {
          connect: [{ userid: 'user2' }, { userid: 'user3' }], // user2 and user3 are members
        },
      },
    });
    
    console.log('Users added to rooms:', room1, room2);
  } catch (error) {
    console.error('Error adding users to rooms:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function updateUserById(userId:number, newData:any) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: newData,
    });

    console.log('Updated User:', updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Deletion of user and room 
// deleteAllUsers();
// deleteAllRooms();


// Creation of users and room
createUsers();
addUsersToRooms();


// updateUserById(58, { roomId: 32 }); // Update user with ID 1 to set chips to 200
// prisma.room.findMany()
// .then(data=>{
//   console.log(data);
// })