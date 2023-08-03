/*
  Warnings:

  - Changed the type of `tablesResetMonth` on the `LeadersGeneral` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "LeadersGeneral" DROP COLUMN "tablesResetMonth",
ADD COLUMN     "tablesResetMonth" INTEGER NOT NULL;
