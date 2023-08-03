-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tokensReward" INTEGER NOT NULL,
    "expReward" INTEGER NOT NULL,
    "timeToComplete" INTEGER NOT NULL,
    "interval" INTEGER NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileApprove" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "fileId" INTEGER NOT NULL,

    CONSTRAINT "FileApprove_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileApproveImg" (
    "id" SERIAL NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileApproveId" INTEGER NOT NULL,

    CONSTRAINT "FileApproveImg_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FileApprove" ADD CONSTRAINT "FileApprove_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileApproveImg" ADD CONSTRAINT "FileApproveImg_fileApproveId_fkey" FOREIGN KEY ("fileApproveId") REFERENCES "FileApprove"("id") ON DELETE CASCADE ON UPDATE CASCADE;
