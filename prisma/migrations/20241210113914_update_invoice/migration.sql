-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "document" TEXT,
ADD COLUMN     "employeeAmount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ergonomicRisk" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "functionsAmount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "kmAmount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "responsibleName" TEXT,
ADD COLUMN     "responsiblePhone" TEXT,
ADD COLUMN     "riskDegree" INTEGER;
