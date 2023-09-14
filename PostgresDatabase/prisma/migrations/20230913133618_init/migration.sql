/*
  Warnings:

  - You are about to drop the column `ownedby` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `ownroom` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_ownedby_fkey";

-- DropIndex
DROP INDEX "Room_ownedby_key";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "ownedby";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ownroom";
