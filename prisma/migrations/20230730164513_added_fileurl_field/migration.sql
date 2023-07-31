/*
  Warnings:

  - Added the required column `fileUrl` to the `TaskApproveImg` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskApproveImg" ADD COLUMN     "fileUrl" TEXT NOT NULL;
