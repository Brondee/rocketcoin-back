/*
  Warnings:

  - Added the required column `referralUserName` to the `ReferralInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReferralInfo" ADD COLUMN     "referralUserName" TEXT NOT NULL;
