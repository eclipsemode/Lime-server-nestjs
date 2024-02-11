/*
  Warnings:

  - You are about to drop the column `type` on the `orderProducts` table. All the data in the column will be lost.
  - You are about to drop the column `orderProductId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderIndex]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `orderProducts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sku]` on the table `productSizes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderIndex]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Made the column `limit` on table `promoCodes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_orderProductId_fkey";

-- DropIndex
DROP INDEX "products_orderProductId_key";

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "orderProducts" DROP COLUMN "type",
ADD COLUMN     "productId" TEXT;

-- AlterTable
ALTER TABLE "productSizes" ALTER COLUMN "sku" DROP NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "orderProductId",
DROP COLUMN "type",
ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "orderIndex" DROP NOT NULL;

-- AlterTable
ALTER TABLE "promoCodes" ALTER COLUMN "limit" SET NOT NULL;

-- DropEnum
DROP TYPE "ProductType";

-- CreateIndex
CREATE UNIQUE INDEX "categories_orderIndex_key" ON "categories"("orderIndex");

-- CreateIndex
CREATE UNIQUE INDEX "orderProducts_productId_key" ON "orderProducts"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "productSizes_sku_key" ON "productSizes"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "products_orderIndex_key" ON "products"("orderIndex");

-- AddForeignKey
ALTER TABLE "orderProducts" ADD CONSTRAINT "orderProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
