-- CreateTable
CREATE TABLE "ReferralInfo" (
    "id" SERIAL NOT NULL,
    "earnedCoins" INTEGER NOT NULL DEFAULT 0,
    "referralUserId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ReferralInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReferralInfo" ADD CONSTRAINT "ReferralInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
