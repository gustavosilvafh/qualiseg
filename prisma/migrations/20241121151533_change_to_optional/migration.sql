-- AlterTable
ALTER TABLE "InvoiceParameter" ADD COLUMN     "aboveTwenty" INTEGER,
ADD COLUMN     "upToFifteen" INTEGER,
ADD COLUMN     "upToFive" INTEGER,
ADD COLUMN     "upToTen" INTEGER,
ADD COLUMN     "upToTwenty" INTEGER,
ALTER COLUMN "baseValue" DROP NOT NULL,
ALTER COLUMN "perEmployee" DROP NOT NULL;
