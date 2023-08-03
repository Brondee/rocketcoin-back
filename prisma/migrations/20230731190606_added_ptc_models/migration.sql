-- CreateTable
CREATE TABLE "Ptc" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "tokensReward" INTEGER NOT NULL,
    "expReward" INTEGER NOT NULL,
    "secondsWait" INTEGER NOT NULL,

    CONSTRAINT "Ptc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PtcClaimed" (
    "id" SERIAL NOT NULL,
    "lastTaken" TEXT NOT NULL,
    "ptcId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PtcClaimed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PtcClaimed" ADD CONSTRAINT "PtcClaimed_ptcId_fkey" FOREIGN KEY ("ptcId") REFERENCES "Ptc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PtcClaimed" ADD CONSTRAINT "PtcClaimed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
