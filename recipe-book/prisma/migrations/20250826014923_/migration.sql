/*
  Warnings:

  - The primary key for the `recipe_ingredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `newId` on the `recipe_ingredient` table. All the data in the column will be lost.
  - The primary key for the `recipe_seasoning` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `newId` on the `recipe_seasoning` table. All the data in the column will be lost.
  - Made the column `id` on table `recipe_ingredient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id` on table `recipe_seasoning` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "recipe_ingredient_pkey",
DROP COLUMN "newId",
ALTER COLUMN "id" SET NOT NULL,
ADD CONSTRAINT "recipe_ingredient_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "recipe_seasoning" DROP CONSTRAINT "recipe_seasoning_pkey",
DROP COLUMN "newId",
ALTER COLUMN "id" SET NOT NULL,
ADD CONSTRAINT "recipe_seasoning_pkey" PRIMARY KEY ("id");
