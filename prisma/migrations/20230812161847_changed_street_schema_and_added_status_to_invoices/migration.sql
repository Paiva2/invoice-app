/*
  Warnings:

  - You are about to drop the column `streetAddress` on the `Invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Invoice` DROP COLUMN `streetAddress`,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'pending';
