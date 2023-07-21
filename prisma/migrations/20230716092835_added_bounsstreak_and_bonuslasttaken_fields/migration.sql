-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bonusLastTaken" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "bonusStreak" INTEGER NOT NULL DEFAULT 0;
