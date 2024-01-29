/*
  Warnings:

  - You are about to drop the column `dateOfBirth` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `entrance` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `floor` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `house` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `room` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `orderProducts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderProductId]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `promoCodes` will be added. If there are existing duplicate values, this will fail.
  - Made the column `orderId` on table `orderProducts` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bonuses" DROP CONSTRAINT "bonuses_userId_fkey";

-- DropForeignKey
ALTER TABLE "orderProducts" DROP CONSTRAINT "orderProducts_orderId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_branchId_fkey";

-- DropForeignKey
ALTER TABLE "productSizes" DROP CONSTRAINT "productSizes_productId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_userId_fkey";

-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "bonuses" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "orderProducts" ALTER COLUMN "orderId" SET NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "channel" SET DEFAULT 2030,
ALTER COLUMN "branchId" DROP NOT NULL;

-- AlterTable
CREATE SEQUENCE products_orderindex_seq;
ALTER TABLE "products" ALTER COLUMN "orderIndex" SET DEFAULT nextval('products_orderindex_seq'),
ALTER COLUMN "categoryId" DROP NOT NULL;
ALTER SEQUENCE products_orderindex_seq OWNED BY "products"."orderIndex";

-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "dateOfBirth",
DROP COLUMN "email",
DROP COLUMN "entrance",
DROP COLUMN "floor",
DROP COLUMN "house",
DROP COLUMN "name",
DROP COLUMN "room",
DROP COLUMN "street",
DROP COLUMN "surname",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "name" TEXT,
    "surname" TEXT,
    "street" TEXT,
    "house" TEXT,
    "floor" TEXT,
    "entrance" TEXT,
    "room" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "orderProducts_orderId_key" ON "orderProducts"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "products_orderProductId_key" ON "products"("orderProductId");

-- CreateIndex
CREATE UNIQUE INDEX "promoCodes_code_key" ON "promoCodes"("code");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bonuses" ADD CONSTRAINT "bonuses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderProducts" ADD CONSTRAINT "orderProducts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productSizes" ADD CONSTRAINT "productSizes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
