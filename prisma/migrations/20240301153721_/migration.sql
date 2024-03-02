/*
  Warnings:

  - You are about to drop the column `isMultiple` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "isMultiple",
ADD COLUMN     "isPizza" BOOLEAN NOT NULL DEFAULT false;
