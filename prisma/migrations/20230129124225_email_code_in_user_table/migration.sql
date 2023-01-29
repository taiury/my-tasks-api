/*
  Warnings:

  - A unique constraint covering the columns `[email_code]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `email_code` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_code_key` ON `User`(`email_code`);
