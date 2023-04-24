/*
  Warnings:

  - A unique constraint covering the columns `[trade_name]` on the table `gyms` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `gyms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `gyms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gyms" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "gyms_trade_name_key" ON "gyms"("trade_name");

-- CreateIndex
CREATE UNIQUE INDEX "gyms_email_key" ON "gyms"("email");
