/*
  Warnings:

  - You are about to drop the column `userId` on the `LinkInfo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "LinkInfo" DROP CONSTRAINT "LinkInfo_userId_fkey";

-- AlterTable
ALTER TABLE "LinkInfo" DROP COLUMN "userId";
