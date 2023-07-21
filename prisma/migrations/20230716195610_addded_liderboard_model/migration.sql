-- AlterTable
ALTER TABLE "users" ALTER COLUMN "level" SET DEFAULT 1;

-- CreateTable
CREATE TABLE "LiderBoard" (
    "id" SERIAL NOT NULL,
    "ptcLeaderAmount" INTEGER NOT NULL DEFAULT 0,
    "ptcLeaderId" INTEGER NOT NULL,
    "linksLeaderAmount" INTEGER NOT NULL DEFAULT 0,
    "linksLeaderId" INTEGER NOT NULL,
    "faucetLeaderAmount" INTEGER NOT NULL DEFAULT 0,
    "faucetLeaderId" INTEGER NOT NULL,
    "offerwallLeaderAmount" INTEGER NOT NULL DEFAULT 0,
    "offerwallLeaderId" INTEGER NOT NULL,
    "expLeaderAmount" INTEGER NOT NULL DEFAULT 0,
    "expLeaderId" INTEGER NOT NULL,

    CONSTRAINT "LiderBoard_pkey" PRIMARY KEY ("id")
);
