-- CreateTable
CREATE TABLE "LinkInfo" (
    "id" SERIAL NOT NULL,
    "userIp" TEXT NOT NULL,
    "linkName" TEXT NOT NULL,
    "linkClickCount" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "LinkInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LinkInfo" ADD CONSTRAINT "LinkInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
