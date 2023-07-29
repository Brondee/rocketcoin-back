/*
  Warnings:

  - You are about to drop the column `offerwallDayCount` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "offerwallDayCount",
ADD COLUMN     "faucetChallengesClaimed" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "linksChallengesClaimed" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ptcChallengesClaimed" INTEGER NOT NULL DEFAULT 0;
