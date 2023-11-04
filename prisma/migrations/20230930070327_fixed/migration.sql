/*
  Warnings:

  - Made the column `image` on table `admin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `member` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `admin` MODIFY `image` LONGBLOB NOT NULL;

-- AlterTable
ALTER TABLE `book` MODIFY `image` LONGBLOB NOT NULL;

-- AlterTable
ALTER TABLE `member` MODIFY `image` LONGBLOB NOT NULL;
