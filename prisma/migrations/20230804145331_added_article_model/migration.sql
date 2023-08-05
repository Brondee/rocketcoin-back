/*
  Warnings:

  - Added the required column `views` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "views" INTEGER NOT NULL;
