-- CreateTable
CREATE TABLE "LeadersGeneral" (
    "id" SERIAL NOT NULL,
    "tablesResetMonth" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "LeadersGeneral_pkey" PRIMARY KEY ("id")
);
