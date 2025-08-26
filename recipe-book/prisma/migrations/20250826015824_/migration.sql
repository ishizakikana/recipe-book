/*
  Warnings:

  - You are about to drop the column `order` on the `recipe_ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `recipe_seasoning` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "recipe_ingredient" DROP COLUMN "order";

-- AlterTable
ALTER TABLE "recipe_seasoning" DROP COLUMN "order";
