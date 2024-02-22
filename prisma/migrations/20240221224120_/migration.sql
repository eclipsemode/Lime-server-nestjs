/*
  Warnings:

  - You are about to drop the column `orderIndex` on the `orderProducts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orderProducts" DROP COLUMN "orderIndex",
ADD COLUMN     "categoryId" TEXT,
ALTER COLUMN "sku" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orderProducts" ADD CONSTRAINT "orderProducts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
