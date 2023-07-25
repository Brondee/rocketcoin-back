/*
  Warnings:

  - Added the required column `lastClicked` to the `LinkInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LinkInfo" ADD COLUMN     "lastClicked" TEXT NOT NULL;
