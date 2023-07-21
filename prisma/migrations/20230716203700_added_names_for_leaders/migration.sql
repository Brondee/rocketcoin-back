/*
  Warnings:

  - Added the required column `expLeaderName` to the `LiderBoard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faucetLeaderName` to the `LiderBoard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linksLeaderName` to the `LiderBoard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offerwallLeaderName` to the `LiderBoard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ptcLeaderName` to the `LiderBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LiderBoard" ADD COLUMN     "expLeaderName" TEXT NOT NULL,
ADD COLUMN     "faucetLeaderName" TEXT NOT NULL,
ADD COLUMN     "linksLeaderName" TEXT NOT NULL,
ADD COLUMN     "offerwallLeaderName" TEXT NOT NULL,
ADD COLUMN     "ptcLeaderName" TEXT NOT NULL;
