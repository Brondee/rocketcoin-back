-- AlterTable
ALTER TABLE "Ptc" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "PtcAd" (
    "id" SERIAL NOT NULL,
    "viewsCount" INTEGER NOT NULL,
    "viewsTotal" INTEGER NOT NULL,
    "interval" INTEGER NOT NULL,
    "ptcId" INTEGER NOT NULL,

    CONSTRAINT "PtcAd_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PtcAd" ADD CONSTRAINT "PtcAd_ptcId_fkey" FOREIGN KEY ("ptcId") REFERENCES "Ptc"("id") ON DELETE CASCADE ON UPDATE CASCADE;
