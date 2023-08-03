/*
  Warnings:

  - You are about to drop the `PtcAd` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `interval` to the `Ptc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `viewsTotal` to the `Ptc` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PtcAd" DROP CONSTRAINT "PtcAd_ptcId_fkey";

-- AlterTable
ALTER TABLE "Ptc" ADD COLUMN     "interval" INTEGER NOT NULL,
ADD COLUMN     "viewsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "viewsTotal" INTEGER NOT NULL;

-- DropTable
DROP TABLE "PtcAd";
