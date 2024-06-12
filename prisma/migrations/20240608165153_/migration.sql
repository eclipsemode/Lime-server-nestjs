/*
  Warnings:

  - You are about to drop the `UserDateOfBirth` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserDateOfBirth" DROP CONSTRAINT "UserDateOfBirth_profileId_fkey";

-- DropTable
DROP TABLE "UserDateOfBirth";

-- CreateTable
CREATE TABLE "userDateOfBirth" (
    "id" TEXT NOT NULL,
    "profileId" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userDateOfBirth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userDateOfBirth_profileId_key" ON "userDateOfBirth"("profileId");

-- AddForeignKey
ALTER TABLE "userDateOfBirth" ADD CONSTRAINT "userDateOfBirth_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
