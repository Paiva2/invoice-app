-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_invoiceId_fkey`;

-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Invoice` DROP FOREIGN KEY `Invoice_userId_fkey`;

-- DropForeignKey
ALTER TABLE `InvoiceItemList` DROP FOREIGN KEY `InvoiceItemList_invoiceId_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_invoiceId_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_userId_fkey`;

-- RenameIndex
ALTER TABLE `InvoiceItemList` RENAME INDEX `InvoiceItemList_invoiceId_fkey` TO `InvoiceItemList_invoiceId_idx`;
