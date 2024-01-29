-- DropForeignKey
ALTER TABLE "confirmations" DROP CONSTRAINT "confirmations_userId_fkey";

-- AddForeignKey
ALTER TABLE "confirmations" ADD CONSTRAINT "confirmations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
