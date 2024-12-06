/*
  Warnings:

  - Made the column `discountBy` on table `InvoiceParameter` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "InvoiceParameter" ALTER COLUMN "discountBy" SET NOT NULL;
