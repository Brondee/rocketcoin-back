-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "timeMinutes" INTEGER NOT NULL,
    "tokensReward" INTEGER NOT NULL,
    "claimsAvailable" INTEGER NOT NULL,
    "instruction" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskApprove" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "TaskApprove_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskApproveImg" (
    "id" SERIAL NOT NULL,
    "taskApproveId" INTEGER NOT NULL,

    CONSTRAINT "TaskApproveImg_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskApprove" ADD CONSTRAINT "TaskApprove_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskApproveImg" ADD CONSTRAINT "TaskApproveImg_taskApproveId_fkey" FOREIGN KEY ("taskApproveId") REFERENCES "TaskApprove"("id") ON DELETE CASCADE ON UPDATE CASCADE;
