/*
  Warnings:

  - A unique constraint covering the columns `[requestId]` on the table `confirmations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "confirmations_requestId_key" ON "confirmations"("requestId");
