/*
  Warnings:

  - You are about to drop the column `lastWithDraw` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "lastWithDraw",
ADD COLUMN     "lastWithdraw" TEXT NOT NULL DEFAULT '';
