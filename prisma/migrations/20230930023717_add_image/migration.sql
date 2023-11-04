-- AlterTable
ALTER TABLE `admin` ADD COLUMN `image` LONGBLOB NOT NULL;

-- AlterTable
ALTER TABLE `book` ADD COLUMN `image` LONGBLOB NOT NULL;

-- AlterTable
ALTER TABLE `member` ADD COLUMN `image` LONGBLOB NOT NULL;
