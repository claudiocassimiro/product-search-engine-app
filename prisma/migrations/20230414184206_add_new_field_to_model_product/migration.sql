/*
  Warnings:

  - You are about to alter the column `productDescription` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(2000)` to `VarChar(500)`.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productName" VARCHAR(500) NOT NULL DEFAULT '',
ALTER COLUMN "productDescription" SET DATA TYPE VARCHAR(500);
