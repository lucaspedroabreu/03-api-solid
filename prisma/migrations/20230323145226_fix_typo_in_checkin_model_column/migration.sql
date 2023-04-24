/*
  Warnings:

  - You are about to drop the column `checked_gymp` on the `check_ins` table. All the data in the column will be lost.
  - Added the required column `checked_gym` to the `check_ins` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_checked_gymp_fkey";

-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "checked_gymp",
ADD COLUMN     "checked_gym" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_checked_gym_fkey" FOREIGN KEY ("checked_gym") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
