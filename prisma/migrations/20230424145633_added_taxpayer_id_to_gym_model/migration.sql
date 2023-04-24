/*
  Warnings:

  - A unique constraint covering the columns `[taxpayer_id]` on the table `gyms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taxpayer_id` to the `gyms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gyms" ADD COLUMN     "taxpayer_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "gyms_taxpayer_id_key" ON "gyms"("taxpayer_id");
