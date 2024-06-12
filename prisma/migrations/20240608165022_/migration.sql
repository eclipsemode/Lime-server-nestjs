/*
  Warnings:

  - You are about to drop the column `dateOfBirth` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "dateOfBirth";

-- CreateTable
CREATE TABLE "UserDateOfBirth" (
    "id" TEXT NOT NULL,
    "profileId" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserDateOfBirth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDateOfBirth_profileId_key" ON "UserDateOfBirth"("profileId");

-- AddForeignKey
ALTER TABLE "UserDateOfBirth" ADD CONSTRAINT "UserDateOfBirth_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
