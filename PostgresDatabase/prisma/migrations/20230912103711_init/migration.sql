-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "chips" INTEGER NOT NULL DEFAULT 0,
    "roomid" TEXT NOT NULL,
    "ownroom" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "ownedby" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userid_key" ON "User"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "Room_userId_key" ON "Room"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Room_ownedby_key" ON "Room"("ownedby");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roomid_fkey" FOREIGN KEY ("roomid") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_ownedby_fkey" FOREIGN KEY ("ownedby") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
