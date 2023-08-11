/*
  Warnings:

  - You are about to drop the column `dopInfo` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "dopInfo";

-- AlterTable
ALTER TABLE "TaskApprove" ADD COLUMN     "dopInfo" TEXT;
