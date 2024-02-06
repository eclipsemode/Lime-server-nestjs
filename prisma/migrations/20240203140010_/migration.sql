-- AlterTable
ALTER TABLE "bonuses" ALTER COLUMN "score" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "orderProducts" ALTER COLUMN "price" SET DATA TYPE TEXT,
ALTER COLUMN "amount" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "totalPrice" SET DATA TYPE TEXT,
ALTER COLUMN "totalAmount" SET DATA TYPE TEXT,
ALTER COLUMN "clientEntrance" SET DATA TYPE TEXT,
ALTER COLUMN "clientFloor" SET DATA TYPE TEXT,
ALTER COLUMN "clientRoom" SET DATA TYPE TEXT,
ALTER COLUMN "clientTel" SET DATA TYPE TEXT,
ALTER COLUMN "utensils" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "productSizes" ALTER COLUMN "price" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "promoCodes" ALTER COLUMN "discount" SET DATA TYPE TEXT;