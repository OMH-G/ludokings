/*
  Warnings:

  - You are about to drop the column `userId` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `roomid` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownedby]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roomid_fkey";

-- DropIndex
DROP INDEX "Room_userId_key";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "userId",
ADD COLUMN     "ownedby" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roomid",
ADD COLUMN     "roomId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Room_ownedby_key" ON "Room"("ownedby");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_ownedby_fkey" FOREIGN KEY ("ownedby") REFERENCES "User"("userid") ON DELETE SET NULL ON UPDATE CASCADE;
