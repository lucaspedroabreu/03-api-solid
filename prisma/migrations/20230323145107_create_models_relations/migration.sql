/*
  Warnings:

  - Added the required column `checked_gymp` to the `check_ins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checked_user` to the `check_ins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "check_ins" ADD COLUMN     "checked_gymp" TEXT NOT NULL,
ADD COLUMN     "checked_user" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_checked_user_fkey" FOREIGN KEY ("checked_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_checked_gymp_fkey" FOREIGN KEY ("checked_gymp") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
