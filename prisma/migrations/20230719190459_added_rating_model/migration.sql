-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "curRating" INTEGER NOT NULL,
    "ratings" INTEGER[],

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);
