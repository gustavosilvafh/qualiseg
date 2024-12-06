-- CreateTable
CREATE TABLE "InvoiceParameter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "InvoiceParameter_pkey" PRIMARY KEY ("id")
);
