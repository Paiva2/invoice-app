/*
  Warnings:

  - You are about to drop the `BillFrom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BillTo` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `BillFrom` DROP FOREIGN KEY `BillFrom_invoiceId_fkey`;

-- DropForeignKey
ALTER TABLE `BillTo` DROP FOREIGN KEY `BillTo_invoiceId_fkey`;

-- AlterTable
ALTER TABLE `Invoice` ADD COLUMN `cityFrom` TEXT NULL,
    ADD COLUMN `cityTo` TEXT NULL,
    ADD COLUMN `clientEmailTo` TEXT NULL,
    ADD COLUMN `clientNameTo` TEXT NULL,
    ADD COLUMN `countryFrom` TEXT NULL,
    ADD COLUMN `countryTo` TEXT NULL,
    ADD COLUMN `invoiceDateTo` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `paymentTermsTo` TEXT NULL,
    ADD COLUMN `postalCodeFrom` TEXT NULL,
    ADD COLUMN `postalCodeTo` TEXT NULL,
    ADD COLUMN `projectDescriptionTo` TEXT NULL,
    ADD COLUMN `streetFrom` TEXT NULL,
    ADD COLUMN `streetTo` TEXT NULL,
    MODIFY `streetAddress` TEXT NULL;

-- AlterTable
ALTER TABLE `InvoiceItemList` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `quantity` VARCHAR(191) NULL,
    MODIFY `price` DOUBLE NULL,
    MODIFY `total` DOUBLE NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `BillFrom`;

-- DropTable
DROP TABLE `BillTo`;
