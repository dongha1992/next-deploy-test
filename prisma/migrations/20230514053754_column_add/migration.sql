/*
  Warnings:

  - You are about to drop the `BookImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookImage" DROP CONSTRAINT "BookImage_bookId_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "userImages" TEXT[];

-- DropTable
DROP TABLE "BookImage";
