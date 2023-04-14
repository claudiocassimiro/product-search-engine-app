/*
  Warnings:

  - You are about to alter the column `productPrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "productPrice" SET DEFAULT '',
ALTER COLUMN "productPrice" SET DATA TYPE VARCHAR(20);
