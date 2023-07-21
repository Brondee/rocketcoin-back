/*
  Warnings:

  - You are about to drop the `LiderBoard` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "faucetCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "linksCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "offerwallCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ptcCount" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "LiderBoard";
