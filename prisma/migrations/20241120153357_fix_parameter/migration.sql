/*
  Warnings:

  - You are about to drop the column `value` on the `InvoiceParameter` table. All the data in the column will be lost.
  - Added the required column `baseValue` to the `InvoiceParameter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perEmployee` to the `InvoiceParameter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InvoiceParameter" DROP COLUMN "value",
ADD COLUMN     "baseValue" INTEGER NOT NULL,
ADD COLUMN     "perEmployee" INTEGER NOT NULL;
