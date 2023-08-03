/*
  Warnings:

  - Added the required column `ptcType` to the `Ptc` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ptc" ADD COLUMN     "ptcType" TEXT NOT NULL;
